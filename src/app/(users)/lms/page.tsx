'use client';

import { CreateButton } from '@/components/CreateButton';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsLms } from '@/features/lms/config/tableColumnsLms';
import { useTranslation } from '@/i18n';
import { useGetLmsQuery } from '@/lib/services/api/lmsApi/lmsApi';
import { BookOpen } from 'lucide-react';

export default function Page() {
  const { t } = useTranslation();

  const { data: lmsData } = useGetLmsQuery();

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <PageHeader title={t('l.lms')} />

      <CreateButton href="/lms/add" label={t('a.addLms')} icon={<BookOpen />} align="right" />

      <DataTable data={lmsData?.data ?? []} columns={tableColumnsLms(t)} />
    </div>
  );
}
