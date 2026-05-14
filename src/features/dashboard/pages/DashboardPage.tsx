'use client';

import { PageHeader } from '@/components/page-header';
import { useCompanyContext } from '@/hooks';
import { useTranslation } from '@/i18n';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <PageHeader title={`${t('d.dashboard')}`} />

      {companyId && (
        <div className="mt-4">
          <p className="text-muted-foreground">
            Company ID: <span className="font-semibold">{companyId}</span>
          </p>
        </div>
      )}
    </div>
  );
}
