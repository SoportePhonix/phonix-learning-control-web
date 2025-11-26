# 🌍 Sistema de Multilenguaje (i18n)

## 📋 Descripción

Sistema de internacionalización completamente tipado con TypeScript, sin dependencias externas, integrado con Redux para la gestión del estado del idioma.

## 🚀 Características

- ✅ Sin dependencias externas (no i18next, ni react-intl, ni next-intl)
- ✅ TypeScript con autocompletado completo
- ✅ Organización alfabética para escalabilidad
- ✅ Notación de punto para traducciones anidadas: `t('a.active')`
- ✅ Fallback automático a español
- ✅ Actualización automática del atributo `lang` del HTML
- ✅ Detección del idioma del navegador
- ✅ Integrado con Redux

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

## 🔧 Uso Básico

### 1. Usar el hook en componentes

```tsx
'use client';

import { useTranslation } from '@/i18n';

export function MyComponent() {
  const { t, currentLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('w.welcome')}</h1>
      <p>{t('e.email')}</p>
      <p>Idioma actual: {currentLanguage}</p>
    </div>
  );
}
```

### 2. Cambiar el idioma

```tsx
'use client';

import { setLanguage } from '@/lib/features/languageSlice';
import { useDispatch } from 'react-redux';

export function LanguageSelector() {
  const dispatch = useDispatch();

  const changeToEnglish = () => {
    dispatch(setLanguage('en'));
  };

  const changeToSpanish = () => {
    dispatch(setLanguage('es'));
  };

  return (
    <div>
      <button onClick={changeToSpanish}>Español</button>
      <button onClick={changeToEnglish}>English</button>
    </div>
  );
}
```

### 3. Usar el componente LanguageSwitcher

Ya existe un componente listo para usar:

```tsx
import { LanguageSwitcher } from '@/components/language-switcher';

export function Header() {
  return (
    <header>
      <h1>Mi App</h1>
      <LanguageSwitcher />
    </header>
  );
}
```

## 📝 Agregar Nuevas Traducciones

### Paso 1: Determinar la letra

La clave determina el archivo. Por ejemplo, `newFeature` → archivo `n.ts`

### Paso 2: Agregar en español

**Archivo:** `src/i18n/translations/es/n.ts`

```typescript
export const n = {
  name: 'Nombre',
  new: 'Nuevo',
  newFeature: 'Nueva funcionalidad', // ← Nueva traducción
  // ... resto de traducciones
};
```

### Paso 3: Agregar en inglés

**Archivo:** `src/i18n/translations/en/n.ts`

```typescript
export const n = {
  name: 'Name',
  new: 'New',
  newFeature: 'New feature', // ← Nueva traducción
  // ... resto de traducciones
};
```

### Paso 4: Usar en tu código

```tsx
const { t } = useTranslation();
return <p>{t('n.newFeature')}</p>;
```

## 🎯 Sistema de Prioridades del Idioma

El sistema determina el idioma en este orden:

1. **Idioma configurado en Redux** (establecido por el usuario)
2. **Idioma del navegador** (si el configurado no está disponible)
3. **Español** (fallback final)

## 🔄 API del Hook useTranslation

```typescript
const {
  t, // Función de traducción
  currentLanguage, // Idioma actual ('es' | 'en')
  browserLanguage, // Idioma del navegador
  institutionLanguage, // Idioma configurado en Redux
} = useTranslation();
```

### Función `t(key: TranslationKey): string`

Traduce una clave al idioma actual:

```typescript
t('l.login'); // → 'Iniciar sesión' (es) o 'Login' (en)
t('p.password'); // → 'Contraseña' (es) o 'Password' (en)
t('s.save'); // → 'Guardar' (es) o 'Save' (en)
```

## 🎨 Integración con Redux

### Obtener el idioma actual

```tsx
import type { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

const currentLang = useSelector((state: RootState) => state.language.current);
```

### Cambiar el idioma

```tsx
import { setLanguage } from '@/lib/features/languageSlice';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();
dispatch(setLanguage('en')); // Cambiar a inglés
dispatch(setLanguage('es')); // Cambiar a español
```

### Limpiar el idioma (volver al del navegador)

```tsx
import { clearLanguage } from '@/lib/features/languageSlice';

dispatch(clearLanguage());
```

## 📚 Idiomas Soportados

- `es` - Español (predeterminado)
- `en` - Inglés

Para agregar más idiomas:

1. Crear carpeta `src/i18n/translations/[código]/`
2. Crear archivos alfabéticos (a.ts, b.ts, etc.)
3. Agregar en `src/i18n/translations/index.ts`:

```typescript
import { fr } from './fr/';

export const translations = {
  es,
  en,
  fr, // ← Nuevo idioma
};
```

4. Actualizar `LanguageProvider.tsx` y `LanguageSwitcher.tsx`

## ⚠️ Notas Importantes

- **Español es el idioma base**: Define todas las claves primero en español
- **TypeScript fuerza consistencia**: Inglés debe tener las mismas claves que español
- **Organización alfabética**: Facilita encontrar traducciones rápidamente
- **El LanguageProvider debe estar dentro de StoreProvider**: Ya está configurado en `src/app/layout.tsx`

## 🔍 Debugging

Si una traducción no se encuentra:

1. Verifica que la clave existe en `es/[letra].ts`
2. Verifica que la clave existe en `en/[letra].ts`
3. Revisa la consola del navegador (el sistema emite warnings)
4. Verifica que el idioma esté configurado correctamente en Redux

## 🎉 Ejemplo Completo

```tsx
'use client';

import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslation } from '@/i18n';
import { setLanguage } from '@/lib/features/languageSlice';
import { useDispatch } from 'react-redux';

export function WelcomePage() {
  const { t, currentLanguage } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div>
      <header>
        <h1>{t('w.welcome')}</h1>
        <LanguageSwitcher />
      </header>

      <main>
        <p>
          {t('l.language')}: {currentLanguage}
        </p>

        <form>
          <label>{t('e.email')}</label>
          <input type="email" placeholder={t('e.emailAddress')} />

          <label>{t('p.password')}</label>
          <input type="password" placeholder={t('p.password')} />

          <button type="submit">{t('l.login')}</button>
        </form>
      </main>
    </div>
  );
}
```

---

**¡Sistema de multilenguaje completamente funcional y listo para usar! 🚀**
