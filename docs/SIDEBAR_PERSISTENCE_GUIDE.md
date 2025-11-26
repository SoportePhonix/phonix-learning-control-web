# Guía de Persistencia del Estado del Sidebar

Esta guía explica cómo implementar la persistencia del estado del sidebar (expandido/colapsado) en aplicaciones Next.js con shadcn/ui, evitando errores de hidratación y flashes visuales.

## Problema

Por defecto, el sidebar de shadcn/ui no persiste su estado al recargar la página o abrir nuevas pestañas. Además, si se intenta leer desde localStorage durante la renderización inicial, se producen errores de hidratación porque el servidor y el cliente renderizan contenido diferente.

## Solución Implementada

La solución combina dos estrategias:

1. **Cookies** para Server-Side Rendering (SSR) - el servidor puede leer el estado guardado
2. **localStorage** para Client-Side - respaldo y lectura rápida en el cliente

### Paso 1: Modificar el `SidebarProvider`

Archivo: `src/components/ui/sidebar.tsx`

Actualizar la lógica del `SidebarProvider` para:

- Inicializar con `defaultOpen` (consistente entre servidor y cliente)
- Leer de localStorage después de montar el componente
- Guardar en localStorage y cookies cada vez que cambia el estado

```typescript
const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // Initialize state - will be updated by useEffect
  const [_open, _setOpen] = React.useState(defaultOpen);

  // Read from localStorage on mount (client-side only)
  React.useEffect(() => {
    if (openProp === undefined) {
      try {
        const stored = localStorage.getItem(SIDEBAR_COOKIE_NAME);
        if (stored !== null) {
          const storedValue = stored === 'true';
          // Only update if different to avoid unnecessary re-renders
          if (storedValue !== _open) {
            _setOpen(storedValue);
          }
        }
      } catch (error) {
        console.error('Error reading sidebar state from localStorage:', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openProp]);

  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // Save state to localStorage
      try {
        localStorage.setItem(SIDEBAR_COOKIE_NAME, String(openState));
      } catch (error) {
        console.error('Error saving sidebar state to localStorage:', error);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  // ... resto del código
});
```

### Paso 2: Modificar el Layout para Leer las Cookies en el Servidor

Archivo: `src/app/(users)/layout.tsx` (o tu layout principal)

Convertir el componente en `async` y leer las cookies del servidor:

```typescript
import { cookies } from 'next/headers';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  // Read sidebar state from cookies on the server
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get('sidebar:state');
  const defaultOpen = sidebarState ? sidebarState.value === 'true' : true;

  return (
    <AuthProvider>
      <StoreProvider>
        <SessionExpiredProvider>
          <SessionContextProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <SidebarProvider defaultOpen={defaultOpen}>
                <RtkRequestsProvider>
                  <div className="flex h-screen w-screen">
                    <SidebarTrigger className="group-data-[collapsible=offcanvas]:fixed fixed text-var--primitive_verde_base" />
                    <AppSidebar />
                    <main className="flex-1 md:px-8 overflow-y-scroll">{children}</main>
                    <Toaster richColors position="top-right" />
                  </div>
                </RtkRequestsProvider>
              </SidebarProvider>
            </ThemeProvider>
          </SessionContextProvider>
        </SessionExpiredProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
```

### Paso 3: Evitar Flash en el `SidebarTrigger`

Archivo: `src/components/ui/sidebar.tsx`

El `SidebarTrigger` muestra diferentes iconos según el estado. Para evitar el flash:

```typescript
const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar, state, isMobile, openMobile } = useSidebar();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const isOpen = isMobile ? openMobile : state === 'expanded';

    // Si no está montado, renderizar el estado por defecto para evitar hydration mismatch
    if (!mounted) {
      return (
        <Button
          ref={ref}
          data-sidebar="trigger"
          variant="default"
          className={cn(
            'h-4 w-4 p-0 flex items-center justify-center bg-blanco rounded-3xl hover:bg-blanco cursor-pointer',
            className
          )}
          onClick={(event) => {
            onClick?.(event);
            toggleSidebar();
          }}
          {...props}
        >
          <ChevronLeft className="text-morado-oscuro" style={{ width: '20px', height: '20px' }} />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="default"
        className={cn(
          'h-4 w-4 p-0 flex items-center justify-center bg-blanco rounded-3xl hover:bg-blanco cursor-pointer',
          className
        )}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        {isOpen ? (
          <ChevronLeft className="text-morado-oscuro" style={{ width: '20px', height: '20px' }} />
        ) : (
          <ChevronRight className="text-morado-oscuro" style={{ width: '20px', height: '20px' }} />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  }
);
```

### Paso 4: Agregar `suppressHydrationWarning` al Sidebar

Archivo: `src/components/ui/sidebar.tsx`

Agregar la prop en los elementos que pueden tener diferencias entre servidor y cliente:

```typescript
// En el wrapper del SidebarProvider
<div
  style={{ /* ... */ }}
  className={cn('group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar', className)}
  ref={ref}
  suppressHydrationWarning
  {...props}
>
  {children}
</div>

// En el componente Sidebar principal
<div
  ref={ref}
  className="group peer hidden md:block text-sidebar-foreground"
  data-state={state}
  data-collapsible={state === 'collapsed' ? collapsible : ''}
  data-variant={variant}
  data-side={side}
  suppressHydrationWarning
>
  {/* ... */}
</div>
```

## Constantes Necesarias

Asegúrate de que estas constantes estén definidas en `sidebar.tsx`:

```typescript
const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 días
```

## Resultados

✅ **Sin errores de hidratación**: El servidor y el cliente renderizan el mismo estado inicial  
✅ **Sin flash visual**: El sidebar aparece en el estado correcto desde el principio  
✅ **Persistencia**: El estado se mantiene al recargar o abrir nuevas pestañas  
✅ **Doble respaldo**: Usa cookies (para SSR) y localStorage (para cliente)

## Aplicación en Otros Proyectos

Para aplicar esta solución en otros proyectos:

1. **Verifica la versión de shadcn/ui**: Esta solución funciona con la versión actual (2024-2025)
2. **Adapta los nombres**: Cambia los nombres de las constantes si tu proyecto usa diferentes convenciones
3. **Revisa el layout**: Asegúrate de que tu layout principal sea `async` si usas Next.js App Router
4. **Prueba en desarrollo**: Verifica que no haya errores de hidratación en la consola
5. **Personaliza estilos**: Ajusta los iconos y estilos del trigger según tu diseño

## Troubleshooting

### Error: "cookies is not a function"

- Asegúrate de usar Next.js 13+ con App Router
- Verifica que el import sea `import { cookies } from 'next/headers'`

### El estado no persiste

- Revisa la consola del navegador para ver si hay errores al guardar en localStorage
- Verifica que las cookies no estén bloqueadas en el navegador
- Comprueba que `SIDEBAR_COOKIE_NAME` sea el mismo en todos los lugares

### Todavía veo un flash

- Asegúrate de que el layout sea `async` y lea las cookies
- Verifica que `defaultOpen` se pase correctamente al `SidebarProvider`
- Revisa que `suppressHydrationWarning` esté en los elementos correctos

## Referencias

- [Next.js - Cookies](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [React - Hydration Errors](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html)
- [shadcn/ui - Sidebar](https://ui.shadcn.com/docs/components/sidebar)
