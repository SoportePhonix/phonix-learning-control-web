'use client';

import { useEffect } from 'react';

import type { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Obtener idioma desde Redux store
  const institution_lang = useSelector((state: RootState) => state.language.current);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const supportedLanguages = ['es', 'en'];
    const language = institution_lang && supportedLanguages.includes(institution_lang) ? institution_lang : 'es';
    htmlElement.setAttribute('lang', language);
  }, [institution_lang]);

  return <>{children}</>;
}
