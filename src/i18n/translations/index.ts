import { en } from './en/';
import { type TranslationKeys, es } from './es/';

export const translations = {
  es,
  en,
};

export type SupportedLanguages = keyof typeof translations;
export type { TranslationKeys };
