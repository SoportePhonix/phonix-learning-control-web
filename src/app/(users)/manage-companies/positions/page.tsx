'use client';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsPositions } from '@/features/positions/config/tableColumnsPositions';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useTranslation } from '@/i18n';
import { Positions } from '@/lib/services/api/positionsApi/interface';
import { useGetPositionsQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { ArchiveRestore } from 'lucide-react';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext();

  const { data: positionsData } = useGetPositionsQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredPositions = companyId
    ? (positionsData?.data ?? []).filter((position: Positions) => position.companyId === companyId)
    : (positionsData?.data ?? []);

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={`${t('p.positions')}${companyName ? ` - ${companyName}` : ''}`} />

      <CreateButton
        href={`/manage-companies/positions/add?companyId=${companyId}`}
        label={t('a.addPosition')}
        icon={<ArchiveRestore />}
        align="right"
      />

      <DataTable data={filteredPositions} columns={tableColumnsPositions(t, currentUserId)} />
    </div>
  );
}
