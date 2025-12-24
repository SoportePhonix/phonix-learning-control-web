# 🚀 Guía de Implementación: Runtime Config para Next.js + Docker

## 📋 Objetivo

Implementar un sistema de configuración runtime que permita leer variables de entorno **después del build** de Docker, eliminando la necesidad de recompilar en cada despliegue.

## 🎯 Problema que Resuelve

**Antes:**

- Construyes la imagen Docker en local con tus variables locales (ej: `http://localhost:8003`)
- Las variables quedan "quemadas" en el build
- Al desplegar en producción, la app sigue usando las URLs locales
- Necesitas reconstruir para cada ambiente

**Después:**

- Construyes una sola vez
- Las variables se leen en runtime del servidor
- Cambias variables sin reconstruir
- Misma imagen para dev/staging/prod

## 📁 Estructura de Archivos a Crear

```
src/
├── app/
│   ├── api/
│   │   └── config/
│   │       └── route.ts          # ← CREAR
│   └── layout.tsx                 # ← MODIFICAR
├── context/
│   ├── configContext.tsx          # ← CREAR
│   └── index.ts                   # ← MODIFICAR
└── components/
    └── LoginLogo.tsx              # ← CREAR (si tienes logos dinámicos)
```

## 🔧 Implementación Paso a Paso

### Paso 1: Crear el API Route

**Archivo:** `src/app/api/config/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    // Agrega aquí TODAS las variables que necesites cambiar sin rebuild
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
    logoNavbar: process.env.LOGO_NAVBAR || '',
    logoLogin: process.env.LOGO_LOGIN || '',
    logoLoginMobile: process.env.LOGO_LOGIN_MOBILE || '',
    apiForResources: process.env.API_RESOURCES || '',
    informationIcon: process.env.NEXT_PUBLIC_INFORMATION_ICON === 'true',
    informationIconEmail: process.env.NEXT_PUBLIC_INFORMATION_ICON_EMAIL || '',
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
    useSilentLogger: process.env.NEXT_PUBLIC_USE_SILENT_LOGGER === 'true',
    disableConsoleLogging: process.env.NEXT_PUBLIC_DISABLE_CONSOLE_LOGGING === 'true',
  });
}
```

**⚠️ Importante:**

- Solo incluir variables que necesites en el **cliente**
- Variables de servidor (secretos, DB, etc.) NO deben estar aquí

### Paso 2: Crear el Context Provider

**Archivo:** `src/context/configContext.tsx`

```typescript
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface AppConfig {
  baseUrl: string;
  logoNavbar: string;
  logoLogin: string;
  logoLoginMobile: string;
  apiForResources: string;
  informationIcon: boolean;
  informationIconEmail: string;
  logLevel: string;
  useSilentLogger: boolean;
  disableConsoleLogging: boolean;
}

// Valores por defecto (fallback si falla el fetch)
const DEFAULT_CONFIG: AppConfig = {
  baseUrl: '',
  logoNavbar: '',
  logoLogin: '',
  logoLoginMobile: '',
  apiForResources: '',
  informationIcon: false,
  informationIconEmail: '',
  logLevel: 'info',
  useSilentLogger: false,
  disableConsoleLogging: false,
};

const ConfigContext = createContext<AppConfig>(DEFAULT_CONFIG);

interface ConfigProviderProps {
  children: ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch de /api/config al montar
    fetch('/api/config', {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch config');
        return res.json();
      })
      .then((data) => {
        setConfig(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading config:', err);
        setIsLoading(false);
        // Mantener valores por defecto
      });
  }, []);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export const useConfig = () => {
  const context = useContext(ConfigContext);
  return context;
};
```

### Paso 3: Exportar el Context

**Archivo:** `src/context/index.ts`

```typescript
// Si ya existe, agregar estas líneas
export { ConfigProvider, useConfig } from './configContext';
export type { AppConfig } from './configContext';

// Mantener otras exportaciones existentes
// export { SessionProvider } from './sessionContext';
```

### Paso 4: Envolver la App con ConfigProvider

**Archivo:** `src/app/layout.tsx`

```typescript
import { ConfigProvider } from '@/context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ConfigProvider>
          {/* Otros providers existentes */}
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
```

**⚠️ Orden de providers:**

```tsx
<ConfigProvider>
  {' '}
  {/* Primero */}
  <SessionProvider>
    {' '}
    {/* Segundo */}
    <QueryProvider>
      {' '}
      {/* Tercero */}
      {children}
    </QueryProvider>
  </SessionProvider>
</ConfigProvider>
```

### Paso 5: Crear Componente para Logos (Opcional)

**Solo si tienes logos dinámicos que cambian entre ambientes**

**Archivo:** `src/components/LoginLogo.tsx`

```typescript
'use client';

import Image from 'next/image';
import { useConfig } from '@/context';

interface LoginLogoProps {
  isMobile?: boolean;
  className?: string;
}

export function LoginLogo({ isMobile = false, className = '' }: LoginLogoProps) {
  const { logoLogin, logoLoginMobile } = useConfig();

  const src = isMobile ? logoLoginMobile : logoLogin;
  const width = isMobile ? 285 : 618;
  const height = isMobile ? 36 : 926;

  if (!src) return null;

  return <Image className={className} src={src} width={width} height={height} alt="Logo" priority />;
}
```

### Paso 6: Migrar Componentes Existentes

**Buscar todos los componentes que usen `process.env` directamente:**

```bash
# Buscar en tu proyecto
grep -r "process.env.NEXT_PUBLIC" src/
grep -r "process.env.LOGO" src/
grep -r "process.env.API_FOR" src/
```

**Antes:**

```tsx
const MyComponent = () => {
  const logo = process.env.LOGO_LOGIN;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return <img src={logo} alt="Logo" />;
};
```

**Después:**

```tsx
'use client'; // ← Importante si no es client component
import { useConfig } from '@/context';

const MyComponent = () => {
  const { logoLogin, baseUrl } = useConfig();

  return <img src={logoLogin} alt="Logo" />;
};
```

### Paso 7: Actualizar Layouts de Login/Maintenance

**Antes:** `src/app/(login)/layout.tsx`

```tsx
<Image src={`${process.env.LOGO_LOGIN}`} ... />
```

**Después:**

```tsx
import { LoginLogo } from '@/components/LoginLogo';

// En el JSX:
<LoginLogo className="w-auto max-h-100" />
<LoginLogo isMobile className="absolute top-6" />
```

### Paso 8: Actualizar next.config.js

**Verificar configuración de imágenes:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.PROTOCOL || 'http',
        hostname: process.env.HOSTNAME_CLIENT || '127.0.0.1',
        port: process.env.NODE_ENV === 'development' ? process.env.HOSTNAME_CLIENT_PORT || '3000' : '',
      },
      {
        protocol: process.env.PROTOCOL || 'http',
        hostname: process.env.HOSTNAME_SERVER || '127.0.0.1',
        port: process.env.NODE_ENV === 'development' ? process.env.HOSTNAME_SERVER_PORT || '8000' : '',
      },
      // Patrones adicionales para HTTPS
      process.env.HOSTNAME_SERVER && {
        protocol: 'https',
        hostname: process.env.HOSTNAME_SERVER,
        port: '',
      },
      process.env.HOSTNAME_CLIENT && {
        protocol: 'https',
        hostname: process.env.HOSTNAME_CLIENT,
        port: '',
      },
    ].filter((pattern) => pattern && pattern.protocol && pattern.hostname),
  },
};

module.exports = nextConfig;
```

**⚠️ Importante:**

- Usa `port: ''` (string vacío) en producción, NO `undefined`
- Agrega patrones para HTTPS si tu producción usa HTTPS

### Paso 9: Verificar Dockerfile

**Tu Dockerfile debe:**

1. Hacer `yarn build` UNA SOLA VEZ
2. Usar `CMD ["yarn", "start"]` (NO `start:docker`)
3. NO incluir recompilación en el CMD

```dockerfile
# Etapa de build
FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build                    # ← Build una sola vez

# Etapa de producción
FROM node:lts-alpine
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
# ... resto de configuración

CMD ["yarn", "start"]             # ← Solo start, NO rebuild
```

## 🧪 Testing

### 1. Test Local

```bash
# Build
docker build -t test-app .

# Run con variables
docker run -d --name test1 \
  -e LOGO_LOGIN=https://prod-domain.com/logo.svg \
  -e API_RESOURCES=https://prod-domain.com \
  -p 3000:3000 \
  test-app

# Verificar
curl http://localhost:3000/api/config
```

### 2. Verificar en Navegador

```javascript
// Consola del navegador
fetch('/api/config')
  .then((r) => r.json())
  .then(console.log);
```

### 3. Test de Cambio de Variables

```bash
# Cambiar variable externa
vim /path/to/.env

# Reiniciar contenedor (NO rebuild)
docker restart test1

# Verificar cambio
curl http://localhost:3000/api/config
```

## ✅ Checklist de Implementación

- [ ] Crear `/api/config/route.ts`
- [ ] Crear `context/configContext.tsx`
- [ ] Actualizar `context/index.ts`
- [ ] Envolver app con `ConfigProvider` en `layout.tsx`
- [ ] Crear `LoginLogo.tsx` (si aplica)
- [ ] Migrar componentes con `process.env` a `useConfig()`
- [ ] Actualizar layouts de login/maintenance
- [ ] Verificar `next.config.js` (imágenes remotePatterns)
- [ ] Verificar `Dockerfile` (build único, CMD sin rebuild)
- [ ] Test en local con Docker
- [ ] Test cambio de variables sin rebuild
- [ ] Documentar variables en README

## 📝 Variables de Entorno Requeridas

Crear archivo `.env.example` con:

```bash
# URLs Base
NEXT_PUBLIC_BASE_URL=
API_RESOURCES=

# Logos (URLs completas)
LOGO_LOGIN=
LOGO_LOGIN_MOBILE=
LOGO_NAVBAR=

# Configuración
NEXT_PUBLIC_INFORMATION_ICON=false
NEXT_PUBLIC_INFORMATION_ICON_EMAIL=

# Logging
NEXT_PUBLIC_LOG_LEVEL=info
NEXT_PUBLIC_USE_SILENT_LOGGER=false
NEXT_PUBLIC_DISABLE_CONSOLE_LOGGING=false

# Next.js Config
PROTOCOL=https
HOSTNAME_CLIENT=
HOSTNAME_SERVER=
```

## 🚨 Errores Comunes

### Error: "useConfig must be used within ConfigProvider"

**Causa:** El componente no está dentro del ConfigProvider

**Solución:**

```tsx
// Verificar que en layout.tsx:
<ConfigProvider>
  <TuComponente /> {/* ← Debe estar adentro */}
</ConfigProvider>
```

### Error: Valores undefined en useConfig

**Causa:** Variables no configuradas en Docker

**Solución:**

```bash
# Verificar variables en el contenedor
docker exec <container-id> env | grep -E "LOGO|API_RESOURCES"
```

### Error: URLs locales en producción

**Causa:** Variables "quemadas" en el build anterior

**Solución:** Reconstruir UNA VEZ con este nuevo sistema

## 📊 Resultados Esperados

**Antes:**

- ❌ Build: 2-5 minutos cada despliegue
- ❌ Diferentes imágenes por ambiente
- ❌ Cambiar logo = reconstruir todo

**Después:**

- ✅ Build: Una sola vez (5-10 min)
- ✅ Inicio: 20-40 segundos
- ✅ Misma imagen para todos los ambientes
- ✅ Cambiar logo = solo reiniciar contenedor

## 🎓 Conceptos Clave

1. **Build Time vs Runtime:**
   - Build time: Cuando ejecutas `yarn build` (una sola vez)
   - Runtime: Cuando la app está corriendo (donde leemos config)

2. **Server Components vs Client Components:**
   - Server: Se ejecutan en el servidor, pueden usar `process.env` directo
   - Client: Se ejecutan en el navegador, deben usar `useConfig()`

3. **NEXT*PUBLIC*\* vs variables normales:**
   - `NEXT_PUBLIC_*`: Se exponen al cliente (NO seguras)
   - Sin prefijo: Solo servidor (seguras)
   - Con runtime config: Controlamos qué exponemos

## 📚 Referencias

- Documentación completa: `docs/RUNTIME_CONFIG.md`
- Resumen de migración: `docs/MIGRATION_SUMMARY.md`
- Ejemplo de implementación: Este mismo proyecto

---

**Autor:** Sistema Runtime Config  
**Fecha:** Diciembre 2025  
**Versión:** 1.0
