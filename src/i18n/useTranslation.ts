'use client';

import { useCallback } from 'react';

import type { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

import { type SupportedLanguages, translations } from './translations';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<typeof translations.es>;

export const useTranslation = () => {
  // Obtener idioma desde Redux store
  const institution_lang = useSelector((state: RootState) => state.language.current);

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
