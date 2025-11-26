# Mejoras en el Manejo de Expiración de Sesión

## 📋 Resumen

Se implementaron mejoras en el sistema de validación y cierre automático de sesión cuando el token expira.

---

## 🔧 Cambios Implementados

### 1. **SessionExpiredProvider Mejorado** (`src/utils/context/sessionExpired.tsx`)

**Mejoras:**

- ✅ Verificación más frecuente: cada **10 segundos** (antes era 60 segundos)
- ✅ Verificación inmediata al cargar el componente
- ✅ Detección cuando el usuario regresa a la pestaña (`visibilitychange`)
- ✅ Margen de seguridad: cierra sesión 5 segundos antes de expirar
- ✅ Prevención de múltiples redirecciones con `useRef`

**Beneficios:**

- Respuesta más rápida ante tokens expirados
- Mejor experiencia de usuario al detectar cambios de foco
- Evita que el usuario intente acciones con token expirado

---

### 2. **Interceptor de API con Manejo de 401** (`src/lib/services/api/api.ts`)

**Mejoras:**

- ✅ Detección automática de respuestas HTTP 401 (Unauthorized)
- ✅ Detección de errores 401 en la estructura `success: false`
- ✅ Redirección automática a `/logout` cuando detecta token expirado
- ✅ Logging para debugging

**Beneficios:**

- No necesitas manejar errores 401 en cada petición
- Cierre de sesión automático si el backend rechaza el token
- Previene errores en cascada por tokens inválidos

---

### 3. **Validación en Callbacks JWT** (`src/lib/auth.ts`)

**Mejoras:**

- ✅ Verificación de expiración en el callback `jwt`
- ✅ Marca tokens expirados con un flag de error
- ✅ Prevención de creación de sesiones con tokens expirados

**Beneficios:**

- Validación en el servidor (más seguro)
- Evita que se generen sesiones inválidas
- Control centralizado de la expiración

---

### 4. **Hook Personalizado** (`src/hooks/use-session-validation.ts`)

**Nuevo hook: `useSessionValidation`**

**Características:**

```typescript
const { session, status, isExpired } = useSessionValidation(10000);
```

- ✅ Verificación automática de expiración
- ✅ Intervalo configurable (por defecto 10 segundos)
- ✅ Redirección automática al logout
- ✅ Retorna estado de expiración

**Uso recomendado:**
En componentes críticos donde necesites asegurar que la sesión esté activa:

```tsx
'use client';

import { useSessionValidation } from '@/hooks/use-session-validation';

export default function CriticalPage() {
  const { session, isExpired } = useSessionValidation();

  if (isExpired) {
    return <div>Redirigiendo...</div>;
  }

  // Tu componente aquí
}
```

---

## 🚀 Capas de Protección

El sistema ahora cuenta con **4 capas de protección**:

1. **Capa de Proveedor Global** (`SessionExpiredProvider`)
   - Verifica cada 10 segundos
   - Detecta cuando el usuario regresa a la pestaña

2. **Capa de API** (RTK Query interceptor)
   - Captura errores 401 automáticamente
   - Redirige al logout en cualquier petición fallida

3. **Capa de Servidor** (NextAuth callbacks)
   - Valida tokens en el servidor
   - Previene sesiones inválidas

4. **Capa de Componente** (Hook `useSessionValidation`)
   - Protección adicional para componentes específicos
   - Control granular según necesidad

---

## 📊 Comparación: Antes vs Después

| Aspecto                      | Antes                   | Después       |
| ---------------------------- | ----------------------- | ------------- |
| Intervalo de verificación    | 60 segundos             | 10 segundos   |
| Detección al cambiar pestaña | ❌ No                   | ✅ Sí         |
| Manejo de errores 401        | Manual en cada petición | Automático    |
| Validación en servidor       | ❌ No                   | ✅ Sí         |
| Margen de seguridad          | ❌ No                   | ✅ 5 segundos |
| Hook reutilizable            | ❌ No                   | ✅ Sí         |

---

## 🔐 Configuración Actual

**Tiempo de expiración del token:**

- Backend: ~235 minutos (configurado en `auth.ts`)
- Margen de cierre anticipado: 5 segundos

**Intervalos de verificación:**

- `SessionExpiredProvider`: cada 10 segundos
- `useSessionValidation`: configurable (por defecto 10 segundos)

---

## 🛠️ Mantenimiento

### Ajustar el intervalo de verificación

Si quieres cambiar la frecuencia de verificación:

**En SessionExpiredProvider:**

```typescript
// En src/utils/context/sessionExpired.tsx
const interval = setInterval(() => {
  checkExpiration();
}, 10000); // Cambiar este valor (en milisegundos)
```

**En componentes específicos:**

```typescript
// Verificar cada 5 segundos en lugar de 10
const { session } = useSessionValidation(5000);
```

### Ajustar el margen de seguridad

Si quieres cerrar la sesión con más o menos anticipación:

```typescript
// En ambos archivos (sessionExpired.tsx y use-session-validation.ts)
if (timeUntilExpiry <= 5000) {
  // Cambiar 5000 por el valor deseado
  // ...
}
```

---

## 🧪 Pruebas Recomendadas

1. **Prueba de expiración natural:**
   - Iniciar sesión
   - Esperar a que el token expire
   - Verificar que redirige automáticamente a `/logout`

2. **Prueba de petición con token expirado:**
   - Forzar un token expirado en las cookies
   - Hacer una petición a la API
   - Verificar que detecta el 401 y redirige

3. **Prueba de cambio de pestaña:**
   - Dejar la sesión cerca de expirar
   - Cambiar a otra pestaña
   - Volver a la aplicación
   - Verificar que detecta la expiración inmediatamente

4. **Prueba de carga con sesión expirada:**
   - Cerrar el navegador con sesión activa
   - Esperar a que expire
   - Abrir de nuevo
   - Verificar que redirige al login

---

## 📝 Notas Adicionales

- Todos los logs usan `console.warn` para facilitar debugging
- Las redirecciones solo ocurren en el cliente (`typeof window !== 'undefined'`)
- El hook `useSessionValidation` es opcional, el sistema funciona sin él
- Se mantiene compatibilidad con el código existente

---

## 🔄 Próximos Pasos Sugeridos

1. **Implementar refresh token:** Renovar tokens automáticamente antes de expirar
2. **Modal de advertencia:** Avisar al usuario 2 minutos antes de expirar
3. **Persistencia de actividad:** Extender la sesión con actividad del usuario
4. **Métricas:** Registrar cuántas sesiones expiran y cuándo

---

## 🔄 Guía de Implementación en Otros Proyectos

Esta sección te ayudará a replicar estas mejoras en otros proyectos similares.

### **Requisitos Previos**

Para implementar esta solución necesitas:

- ✅ Next.js 13+ (con App Router)
- ✅ NextAuth.js (para autenticación)
- ✅ RTK Query (para peticiones API)
- ✅ TypeScript

---

### **Paso 1: Mejorar el Provider de Expiración de Sesión**

**Archivo:** `src/utils/context/sessionExpired.tsx` (o similar)

```typescript
'use client';

import React, { ReactNode, createContext, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SessionExpiredValue {
  socket: WebSocket | null;
}

const SessionExpired = createContext<SessionExpiredValue | null>(null);

interface SessionExpiredProviderProps {
  children: ReactNode;
}

export const SessionExpiredProvider = ({ children }: SessionExpiredProviderProps) => {
  const session = useSession();
  const router = useRouter();
  const isLoggingOut = useRef(false);

  useEffect(() => {
    if (!session?.data?.user?.expiresAt) return;

    const expirationTime = Number(session.data.user.expiresAt);

    const checkExpiration = () => {
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;

      // Ajusta 5000 (5 segundos) según necesites
      if (timeUntilExpiry <= 5000 && !isLoggingOut.current) {
        isLoggingOut.current = true;
        console.warn('Token expirado. Redirigiendo al logout...');
        router.push('/logout'); // Ajusta la ruta según tu proyecto
        return true;
      }
      return false;
    };

    if (checkExpiration()) return;

    // Ajusta 10000 (10 segundos) según necesites
    const interval = setInterval(() => {
      checkExpiration();
    }, 10000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkExpiration();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [session, router]);

  return <SessionExpired.Provider value={{ socket: null }}>{children}</SessionExpired.Provider>;
};
```

**Integración en Layout:**

```tsx
// app/(users)/layout.tsx o app/layout.tsx
<SessionExpiredProvider>{children}</SessionExpiredProvider>
```

---

### **Paso 2: Agregar Interceptor de API (RTK Query)**

**Archivo:** Tu archivo de configuración de API (ej: `src/lib/services/api/api.ts`)

```typescript
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Adapta esta interfaz según la estructura de errores de tu backend
interface ApiErrorResponse {
  success: false;
  error: {
    statusCode: number;
    message: string;
    error?: string;
  };
}

const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `/api`, // Ajusta según tu configuración
  });

  const result = await baseQuery(args, api, extraOptions);

  // Manejar errores 401 (Unauthorized)
  if (result.error && result.error.status === 401) {
    console.warn('Token expirado o inválido. Redirigiendo al logout...');
    if (typeof window !== 'undefined') {
      window.location.href = '/logout'; // Ajusta la ruta según tu proyecto
    }
    return result;
  }

  // Adapta esta sección según la estructura de respuestas de tu backend
  if (result.data && typeof result.data === 'object' && 'success' in result.data) {
    const data = result.data as ApiErrorResponse;
    if (data.success === false) {
      if (data.error?.statusCode === 401) {
        console.warn('Token expirado detectado en respuesta. Redirigiendo al logout...');
        if (typeof window !== 'undefined') {
          window.location.href = '/logout';
        }
      }

      return {
        error: {
          status: data.error?.statusCode || 500,
          data: data.error,
        } as FetchBaseQueryError,
      };
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithErrorHandling, // Usa el baseQuery personalizado
  tagTypes: ['Users'], // Ajusta según tu proyecto
  endpoints: () => ({}),
});
```

---

### **Paso 3: Mejorar Callbacks de NextAuth**

**Archivo:** Tu archivo de configuración de NextAuth (ej: `src/lib/auth.ts` o `app/api/auth/[...nextauth]/route.ts`)

```typescript
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  // ... tu configuración existente

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Guarda los datos del usuario en el token
        token.accessToken = user.accessToken;
        token.expiresAt = user.expiresAt;
        token.id = user.id;
        // ... otros campos
      }

      // NUEVO: Verificar si el token ha expirado
      const expiresAt = Number(token.expiresAt);
      const now = Date.now();

      if (expiresAt && now > expiresAt) {
        console.warn('Token JWT expirado en callback');
        return {
          ...token,
          error: 'TokenExpired',
        };
      }

      return token;
    },

    async session({ session, token }) {
      // NUEVO: Si el token tiene error, no retornar sesión
      if ('error' in token && token.error === 'TokenExpired') {
        throw new Error('Token expirado');
      }

      // Asigna los datos del token a la sesión
      session.user = {
        ...session.user,
        accessToken: String(token.accessToken),
        expiresAt: Number(token.expiresAt),
        id: Number(token.id),
        // ... otros campos
      };

      return session;
    },
  },

  // ... resto de tu configuración
};
```

**IMPORTANTE:** Asegúrate de que tu `expiresAt` sea un timestamp en milisegundos (usar `Date.now()` o `new Date().getTime()`).

---

### **Paso 4: Crear Hook Personalizado (Opcional pero Recomendado)**

**Archivo:** `src/hooks/use-session-validation.ts`

```typescript
'use client';

import { useEffect, useRef } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Hook para validar automáticamente la sesión y redirigir si expira
 * @param checkIntervalMs - Intervalo de verificación en milisegundos (por defecto 10000 = 10 segundos)
 */
export function useSessionValidation(checkIntervalMs: number = 10000) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isRedirecting = useRef(false);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.expiresAt) {
      return;
    }

    const checkTokenExpiration = () => {
      const expiresAt = Number(session.user.expiresAt);
      const now = Date.now();
      const timeUntilExpiry = expiresAt - now;

      // Ajusta 5000 (5 segundos) según necesites
      if (timeUntilExpiry <= 5000 && !isRedirecting.current) {
        isRedirecting.current = true;
        console.warn('useSessionValidation: Token expirado, redirigiendo...');
        router.push('/logout'); // Ajusta la ruta según tu proyecto
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, checkIntervalMs);

    return () => clearInterval(interval);
  }, [session, status, router, checkIntervalMs]);

  return {
    session,
    status,
    isExpired: session?.user?.expiresAt ? Date.now() > Number(session.user.expiresAt) : false,
  };
}
```

**Uso en componentes:**

```tsx
'use client';

import { useSessionValidation } from '@/hooks/use-session-validation';

export default function ProtectedPage() {
  const { session, isExpired } = useSessionValidation();

  if (isExpired) {
    return <div>Redirigiendo...</div>;
  }

  return <div>Contenido protegido</div>;
}
```

---

### **Paso 5: Actualizar Tipos de TypeScript**

**Archivo:** `app/next-auth.d.ts` (o donde declares tus tipos de NextAuth)

```typescript
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      accessToken: string;
      expiresAt: number; // IMPORTANTE: Agregar este campo
      // ... otros campos personalizados
    } & DefaultSession['user'];
  }

  interface User {
    id: number;
    accessToken: string;
    expiresAt: number; // IMPORTANTE: Agregar este campo
    // ... otros campos personalizados
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    expiresAt: number; // IMPORTANTE: Agregar este campo
    error?: string; // Para manejar errores de expiración
    // ... otros campos personalizados
  }
}
```

---

### **Checklist de Implementación**

Marca cada paso conforme lo completes:

- [ ] **Paso 1:** Implementar o mejorar `SessionExpiredProvider`
- [ ] **Paso 2:** Agregar interceptor en RTK Query `baseQuery`
- [ ] **Paso 3:** Mejorar callbacks `jwt` y `session` de NextAuth
- [ ] **Paso 4:** Crear hook `useSessionValidation` (opcional)
- [ ] **Paso 5:** Actualizar tipos de TypeScript
- [ ] **Verificar:** Que el backend retorne `expiresAt` en milisegundos
- [ ] **Verificar:** Que la ruta `/logout` exista y funcione
- [ ] **Probar:** Expiración natural del token
- [ ] **Probar:** Petición con token expirado (401)
- [ ] **Probar:** Cambio de pestaña con sesión próxima a expirar

---

### **Adaptaciones Según el Framework**

#### **Si usas Pages Router (Next.js antiguo):**

- Cambia `'use client'` por componentes de cliente explícitos
- Usa `next/router` en lugar de `next/navigation`
- Ajusta la estructura de archivos según Pages Router

#### **Si usas otro estado global (Redux, Zustand, Context API):**

- Adapta la lógica a tu sistema de estado
- Mantén la misma lógica de verificación de `expiresAt`

#### **Si NO usas RTK Query:**

- Implementa el interceptor en Axios, Fetch, o tu librería de peticiones
- Ejemplo con Axios:

```typescript
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/logout';
    }
    return Promise.reject(error);
  }
);
```

#### **Si NO usas NextAuth:**

- Adapta los callbacks a tu sistema de autenticación (Auth0, Clerk, custom, etc.)
- Mantén la lógica de verificar `expiresAt` con `Date.now()`

---

### **Configuraciones Recomendadas**

```typescript
// Valores recomendados para diferentes escenarios

// Alta seguridad (aplicaciones financieras, salud, etc.)
const CHECK_INTERVAL = 5000; // 5 segundos
const EXPIRY_MARGIN = 10000; // 10 segundos antes

// Seguridad estándar (aplicaciones de negocio)
const CHECK_INTERVAL = 10000; // 10 segundos
const EXPIRY_MARGIN = 5000; // 5 segundos antes

// Baja frecuencia (aplicaciones públicas, menor carga)
const CHECK_INTERVAL = 30000; // 30 segundos
const EXPIRY_MARGIN = 2000; // 2 segundos antes
```

---

### **Solución de Problemas Comunes**

#### **Problema: "El token no expira automáticamente"**

**Solución:**

- Verifica que `expiresAt` sea un número en milisegundos
- Confirma que el backend retorna el tiempo correcto
- Revisa la consola para logs de verificación

#### **Problema: "Múltiples redirecciones al logout"**

**Solución:**

- Asegúrate de usar `useRef` para `isLoggingOut` / `isRedirecting`
- Verifica que no tengas múltiples providers anidados

#### **Problema: "El interceptor no detecta errores 401"**

**Solución:**

- Confirma que el backend retorna status HTTP 401
- Revisa la estructura de respuesta de tu API
- Añade logs en el interceptor para debugging

#### **Problema: "La sesión no se actualiza después del login"**

**Solución:**

- Asegúrate de que el callback `jwt` guarde `expiresAt`
- Verifica que el provider retorne el campo en la respuesta de login
- Llama a `signIn()` correctamente con las credenciales

---

### **Testing**

#### **Prueba Manual - Expiración Natural:**

```bash
# 1. Inicia sesión normalmente
# 2. En las DevTools del navegador, ejecuta:
const session = await fetch('/api/auth/session').then(r => r.json());
console.log('Expira en:', new Date(session.user.expiresAt));

# 3. Espera a que expire (o modifica expiresAt manualmente en el token)
# 4. Verifica que redirige a /logout
```

#### **Prueba Manual - Error 401:**

```bash
# 1. Inicia sesión
# 2. En el backend, invalida el token manualmente (o borra la sesión)
# 3. Haz una petición a la API desde el frontend
# 4. Verifica que redirige a /logout automáticamente
```

#### **Prueba Manual - Cambio de Pestaña:**

```bash
# 1. Inicia sesión con un token que expire en 1 minuto
# 2. Cambia a otra pestaña del navegador
# 3. Espera a que expire
# 4. Regresa a la pestaña de la aplicación
# 5. Verifica que redirige inmediatamente a /logout
```

---

### **Recursos Adicionales**

- [NextAuth.js Callbacks](https://next-auth.js.org/configuration/callbacks)
- [RTK Query Error Handling](https://redux-toolkit.js.org/rtk-query/usage/error-handling)
- [Next.js App Router](https://nextjs.org/docs/app)
- [JavaScript Date.now()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)

---

**Fecha de implementación:** 28 de diciembre de 2025
**Autor:** GitHub Copilot
