'use client';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsAreas } from '@/features/areas/config/tableColumnsAreas';
import { useTranslation } from '@/i18n';
import { useGetAreasQuery } from '@/lib/services/api/areasApi/areasApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { NotebookPen } from 'lucide-react';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: areasData, isLoading, isFetching, error, status, isSuccess, isError } = useGetAreasQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={t('a.areas')} />

      <CreateButton href="/areas/add" label={t('a.addArea')} icon={<NotebookPen />} align="right" />

      <DataTable data={areasData?.data ?? []} columns={tableColumnsAreas(t, currentUserId)} />
    </div>
  );
}
