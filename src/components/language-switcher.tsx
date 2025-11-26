'use client';

import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type SupportedLanguages, useTranslation } from '@/i18n';
import { setLanguage } from '@/lib/features/languageSlice';
import { Languages } from 'lucide-react';
import { useDispatch } from 'react-redux';

const languages: { code: SupportedLanguages; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const { t, currentLanguage } = useTranslation();
  const dispatch = useDispatch();

  const handleLanguageChange = useCallback(
    (langCode: SupportedLanguages) => {
      dispatch(setLanguage(langCode));
    },
    [dispatch]
  );

  const currentLangData = languages.find((lang) => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" title={t('l.language')}>
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('l.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLangData?.code === lang.code ? 'bg-accent' : ''}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
