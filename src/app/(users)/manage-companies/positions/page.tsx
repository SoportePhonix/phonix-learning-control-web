'use client';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsPositions } from '@/features/positions/config/tableColumnsPositions';
import { useTranslation } from '@/i18n';
import { useGetPositionsQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { ArchiveRestore } from 'lucide-react';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: positionsData, isLoading, isFetching, error, status, isSuccess, isError } = useGetPositionsQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={t('p.positions')} />

      <CreateButton
        href="/manage-companies/positions/add"
        label={t('a.addPosition')}
        icon={<ArchiveRestore />}
        align="right"
      />

      <DataTable data={positionsData?.data ?? []} columns={tableColumnsPositions(t, currentUserId)} />
    </div>
  );
}
