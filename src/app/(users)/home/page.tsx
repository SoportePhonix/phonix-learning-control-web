'use client';

import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';

export default function Page() {
  const { t } = useTranslation();

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-negro font-light mb-4">
        {t('h.home')}
      </Typography>
    </div>
  );
}
