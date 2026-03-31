'use client';

import { CreateButton } from '@/components/CreateButton';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsPositions } from '@/features/positions/config/tableColumnsPositions';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useTranslation } from '@/i18n';
import { Positions } from '@/lib/services/api/positionsApi/interface';
import { useGetPositionsQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { ArchiveRestore } from 'lucide-react';

interface PositionsPageProps {
  baseRoute?: string;
}

export default function PositionsPage({ baseRoute = '/manage-companies/positions' }: PositionsPageProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });

  const { data: positionsData } = useGetPositionsQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredPositions = companyId
    ? (positionsData?.data ?? []).filter((position: Positions) => position.companyId === companyId)
    : (positionsData?.data ?? []);

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <PageHeader title={`${t('p.positions')} - ${companyName}`} />

      <CreateButton href={`${baseRoute}/add`} label={t('a.addPosition')} icon={<ArchiveRestore />} align="right" />

      <DataTable data={filteredPositions} columns={tableColumnsPositions(t, currentUserId)} />
    </div>
  );
}
