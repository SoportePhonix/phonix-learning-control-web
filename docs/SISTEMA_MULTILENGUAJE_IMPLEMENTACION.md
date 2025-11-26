# 🌍 Sistema de Multilenguaje (i18n) - Guía de Implementación Completa

## 📋 Resumen

Sistema de internacionalización **sin librerías externas**, completamente tipado con TypeScript, con organización alfabética de traducciones y autocompletado completo.

**Características:**

- ✅ Sin dependencias externas (no i18next, ni react-intl, ni next-intl)
- ✅ TypeScript con autocompletado completo
- ✅ Organización alfabética para escalabilidad
- ✅ Notación de punto para traducciones anidadas: `t('a.active')`
- ✅ Fallback automático a español
- ✅ Actualización automática del atributo `lang` del HTML
- ✅ Detección del idioma del navegador

---

## 📁 Estructura de Archivos

```
src/i18n/
├── index.ts                    # Exportaciones públicas
├── useTranslation.ts           # Hook principal
├── LanguageProvider.tsx        # Provider para actualizar HTML lang
└── translations/
    ├── index.ts                # Configuración de idiomas
    ├── es/
    │   ├── index.ts            # Índice español
    │   ├── a.ts                # Traducciones con 'a'
    │   ├── b.ts                # Traducciones con 'b'
    │   └── ...                 # Resto del alfabeto
    └── en/
        ├── index.ts            # Índice inglés
        ├── a.ts                # Traducciones con 'a'
        ├── b.ts                # Traducciones con 'b'
        └── ...                 # Resto del alfabeto
```

---

## 🚀 Implementación Paso a Paso

### PASO 1: Crear archivo de traducciones en español

**Archivo:** `src/i18n/translations/es/a.ts`

```typescript
export const a = {
  active: 'Activos',
  activeGroup: 'Grupo Activo',
  accessDenied: 'Acceso denegado',
};
```

**Archivo:** `src/i18n/translations/es/b.ts`

```typescript
export const b = {
  back: 'Volver',
  button: 'Botón',
};
```

**Archivo:** `src/i18n/translations/es/index.ts`

```typescript
import { a } from './a';
import { b } from './b';

// Importar todos los archivos de letras

export const es = {
  a,
  b,
  // Agregar todas las letras
};

export type TranslationKeys = {
  [K in keyof typeof es]: {
    [P in keyof (typeof es)[K]]: string;
  };
};
```

---

### PASO 2: Crear archivo de traducciones en inglés

**Archivo:** `src/i18n/translations/en/a.ts`

```typescript
export const a = {
  active: 'Active',
  activeGroup: 'Active Group',
  accessDenied: 'Access denied',
};
```

**Archivo:** `src/i18n/translations/en/b.ts`

```typescript
export const b = {
  back: 'Back',
  button: 'Button',
};
```

**Archivo:** `src/i18n/translations/en/index.ts`

```typescript
import type { TranslationKeys } from '../es/';
import { a } from './a';
import { b } from './b';

// Importar todos los archivos de letras

export const en: TranslationKeys = {
  a,
  b,
  // Agregar todas las letras
};
```

---

### PASO 3: Configurar idiomas soportados

**Archivo:** `src/i18n/translations/index.ts`

```typescript
import { en } from './en/';
import { type TranslationKeys, es } from './es/';

export const translations = {
  es,
  en,
};

export type SupportedLanguages = keyof typeof translations;
export type { TranslationKeys };
```

---

### PASO 4: Crear hook de traducción

**Archivo:** `src/i18n/useTranslation.ts`

```typescript
import { useCallback } from 'react';

import { type SupportedLanguages, translations } from './translations';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof translations.es>;

export const useTranslation = () => {
  // 🔴 REEMPLAZAR: Obtener idioma desde tu contexto/store
  const institution_lang: string | null = null; // CAMBIAR ESTO

  const getBrowserLanguage = useCallback((): SupportedLanguages => {
    if (typeof window === 'undefined') return 'es';
    const browserLang = navigator.language || navigator.languages?.[0] || 'es';
    const langCode = browserLang.split('-')[0];
    if (langCode in translations) {
      return langCode as SupportedLanguages;
    }
    return 'es';
  }, []);

  const getCurrentLanguage = useCallback((): SupportedLanguages => {
    if (institution_lang && institution_lang in translations) {
      return institution_lang as SupportedLanguages;
    }
    const browserLang = getBrowserLanguage();
    if (browserLang !== 'es') {
      return browserLang;
    }
    return 'es';
  }, [institution_lang, getBrowserLanguage]);

  const getNestedValue = (obj: Record<string, unknown>, path: string): string | undefined => {
    return path.split('.').reduce((current: unknown, key: string) => {
      return current && typeof current === 'object' && current !== null && key in current
        ? (current as Record<string, unknown>)[key]
        : undefined;
    }, obj) as string | undefined;
  };

  const t = useCallback(
    (key: TranslationKey): string => {
      const currentLang = getCurrentLanguage();
      const currentTranslations = translations[currentLang];
      const value = getNestedValue(currentTranslations, key);

      if (value !== undefined) {
        return value;
      }

      if (currentLang !== 'es') {
        const fallbackValue = getNestedValue(translations.es, key);
        if (fallbackValue !== undefined) {
          return fallbackValue;
        }
      }

      console.warn(`Translation key "${key}" not found for language "${currentLang}"`);
      return key;
    },
    [getCurrentLanguage]
  );

  return {
    t,
    currentLanguage: getCurrentLanguage(),
    browserLanguage: getBrowserLanguage(),
    institutionLanguage: institution_lang,
  };
};
```

---

### PASO 5: Crear Provider de idioma

**Archivo:** `src/i18n/LanguageProvider.tsx`

```typescript
'use client';

import { useEffect } from 'react';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 🔴 REEMPLAZAR: Obtener idioma desde tu contexto/store
  const institution_lang: string | null = null; // CAMBIAR ESTO

  useEffect(() => {
    const htmlElement = document.documentElement;
    const supportedLanguages = ['es', 'en'];
    const language = institution_lang && supportedLanguages.includes(institution_lang)
      ? institution_lang
      : 'es';
    htmlElement.setAttribute('lang', language);
  }, [institution_lang]);

  return <>{children}</>;
}
```

---

### PASO 6: Crear exportaciones públicas

**Archivo:** `src/i18n/index.ts`

```typescript
export { useTranslation } from './useTranslation';
export { translations } from './translations';
export { LanguageProvider } from './LanguageProvider';
export type { SupportedLanguages, TranslationKeys } from './translations';
export type { TranslationKey } from './useTranslation';
```

---

## 🔧 Integración en la Aplicación

### 1. Agregar Provider en Layout

```tsx
import { LanguageProvider } from '@/i18n';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

### 2. Usar en Componentes

```tsx
'use client';

import { useTranslation } from '@/i18n';

export function MyComponent() {
  const { t, currentLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('a.active')}</h1>
      <button>{t('b.button')}</button>
      <p>Idioma: {currentLanguage}</p>
    </div>
  );
}
```

---

## 📝 Cómo Agregar Nuevas Traducciones

### Regla: Organización por primera letra

1. **Determinar la letra:** La key `activeGroup` → archivo `a.ts`
2. **Agregar en español:** `src/i18n/translations/es/a.ts`
3. **Agregar en inglés:** `src/i18n/translations/en/a.ts`
4. **Si es un archivo nuevo:** Importar en ambos `index.ts`

### Ejemplo: Agregar "lastNames"

**En** `es/l.ts`:

```typescript
export const l = {
  lastNames: 'Apellidos',
};
```

**En** `en/l.ts`:

```typescript
export const l = {
  lastNames: 'Last names',
};
```

**Importar en** `es/index.ts` y `en/index.ts`:

```typescript
import { l } from './l';

export const es = {
  // ... otras letras
  l,
};
```

**Usar:**

```tsx
const { t } = useTranslation();
return <input placeholder={t('l.lastNames')} />;
```

---

## ⚙️ Configuración de Idioma

### Opciones para obtener el idioma actual

Reemplaza las líneas marcadas con `// 🔴 REEMPLAZAR` en `useTranslation.ts` y `LanguageProvider.tsx`:

**Opción 1: Context API**

```typescript
const { language } = useLanguageContext();
```

**Opción 2: Redux**

```typescript
const language = useSelector((state) => state.language.current);
```

**Opción 3: Zustand**

```typescript
const language = useLanguageStore((state) => state.current);
```

**Opción 4: URL/Query Params**

```typescript
const searchParams = useSearchParams();
const language = searchParams.get('lang');
```

**Opción 5: LocalStorage**

```typescript
const [language, setLanguage] = useState(() =>
  typeof window !== 'undefined' ? localStorage.getItem('language') : null
);
```

---

## 🎯 Sistema de Prioridades del Idioma

El hook `useTranslation` determina el idioma en este orden:

1. **Idioma configurado** (context/store/etc.)
2. **Idioma del navegador** (si el configurado no está disponible)
3. **Español** (fallback final)

---

## 📊 Estructura de Ejemplo Completa

```
src/i18n/translations/es/
├── a.ts  →  { active: 'Activos', activeGroup: 'Grupo Activo' }
├── b.ts  →  { back: 'Volver', button: 'Botón' }
├── c.ts  →  { cancel: 'Cancelar', completed: 'Completado' }
├── d.ts  →  { dashboard: 'Dashboard', delete: 'Eliminar' }
├── e.ts  →  { email: 'Correo electrónico', error: 'Error' }
├── l.ts  →  { login: 'Iniciar sesión', lastNames: 'Apellidos' }
├── p.ts  →  { password: 'Contraseña', profile: 'Perfil' }
└── s.ts  →  { save: 'Guardar', search: 'Buscar' }
```

---

## ✅ Checklist de Implementación

- [ ] Crear estructura de carpetas `src/i18n/translations/es/` y `en/`
- [ ] Crear archivos de traducciones por letra (a.ts, b.ts, etc.)
- [ ] Crear archivos index en `es/` y `en/`
- [ ] Crear `translations/index.ts` con idiomas soportados
- [ ] Crear `useTranslation.ts` con lógica de traducción
- [ ] Crear `LanguageProvider.tsx` para actualizar HTML
- [ ] Crear `i18n/index.ts` con exportaciones
- [ ] Configurar obtención de idioma (context/store)
- [ ] Agregar `LanguageProvider` en layout
- [ ] Probar con un componente de ejemplo
- [ ] Agregar todas las traducciones necesarias

---

## 🚨 Puntos Críticos a Recordar

1. **Español es el idioma base** - Define todas las claves primero en español
2. **Inglés debe tener las mismas claves** - El tipo `TranslationKeys` lo fuerza
3. **Organización alfabética** - Facilita encontrar traducciones rápidamente
4. **Reemplazar la obtención de idioma** - Busca `// 🔴 REEMPLAZAR` en el código
5. **Importar en los índices** - Si creas un archivo nuevo, agrégalo a `es/index.ts` y `en/index.ts`

---

## 💡 Ejemplo de Uso Completo

```tsx
'use client';

import { useTranslation } from '@/i18n';

export function LoginForm() {
  const { t, currentLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('l.login')}</h1>
      <p>Idioma actual: {currentLanguage}</p>

      <form>
        <input type="email" placeholder={t('e.email')} />
        <input type="password" placeholder={t('p.password')} />
        <button>{t('l.login')}</button>
        <button type="button">{t('c.cancel')}</button>
      </form>
    </div>
  );
}
```

---

## 🎓 Ventajas de este Sistema

✅ **Sin dependencias externas** - No aumenta el bundle size  
✅ **TypeScript completo** - Autocompletado en todo el IDE  
✅ **Escalable** - Organización alfabética clara  
✅ **Simple** - Fácil de entender y mantener  
✅ **Fallbacks inteligentes** - Nunca muestra claves vacías  
✅ **Performance** - Solo JavaScript/TypeScript nativo

---

## 📚 Documentación Adicional Recomendada

Después de implementar, crear estos archivos en tu proyecto:

**`src/i18n/README.md`** - Documenta cómo usar el sistema en tu proyecto  
**`src/i18n/TRANSLATION_GUIDE.md`** - Guía para que el equipo agregue traducciones

---

## 🎉 Resultado Final

Un sistema de multilenguaje completamente funcional, tipado, sin librerías externas, fácil de mantener y con excelente experiencia de desarrollo.

**¡Listo para implementar en cualquier proyecto Next.js o React!**
