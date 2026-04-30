'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumnsPositions } from '@/features/positions/config/tableColumnsPositions';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useCompanyNavigation } from '@/hooks/useCompanyNavigation';
import { useTranslation } from '@/i18n';
import { DataTable } from '@/lib/phonix-ui';
import { Positions } from '@/lib/services/api/positionsApi/interface';
import { useGetPositionsQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { useSessionContext } from '@/utils/context/sessionContext';

interface PositionsPageProps {
  baseRoute?: string;
}

export default function PositionsPage({ baseRoute = '/manage-companies/positions' }: PositionsPageProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });
  const companyNav = useCompanyNavigation();

  const { data: positionsData, isLoading, isFetching } = useGetPositionsQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredPositions = companyId
    ? (positionsData?.data ?? []).filter((position: Positions) => position.companyId === companyId)
    : (positionsData?.data ?? []);

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader
        title={`${t('p.positions')} - ${companyName}`}
        buttonLabel={t('a.addPosition')}
        buttonHref={companyNav.href(`${baseRoute}/add`)}
      />
      <DataTable
        striped
        data={filteredPositions}
        variant="primary"
        columns={tableColumnsPositions(t, currentUserId, companyNav.href)}
        isLoading={isLoading || isFetching}
        storageKey="datatable-positions"
        searchable
        enableFilters={false}
        labels={{
          columnsButton: 'Columnas',
          rowsSuffix: 'filas',
          fallbackColumnName: 'Columna',
        }}
      />
    </div>
  );
}
