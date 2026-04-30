'use client';

import { PageHeader } from '@/components/page-header';
import { AdminInstanceForm } from '@/features/adminInstance/components/AdminInstanceForm';
import { useBreadcrumbs } from '@/hooks';
import { TranslationKey, useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';

export default function AddAdminInstancePage() {
  const { t } = useTranslation();
  const { crumbRoutes } = useBreadcrumbs(
    [
      { label: t('a.adminInstances') as string, path: '/admin-instances' },
      { label: t('a.addAdminInstance') as string },
    ],
    { withLoader: true }
  );

  return (
    <div className="mb-8 px-2 flex flex-col max-w-4xl mx-auto w-full">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('a.addAdminToInstance') as string} />

      <div className="mt-6 border rounded-lg p-6 bg-white dark:bg-card">
        <AdminInstanceForm />
      </div>
    </div>
  );
}
