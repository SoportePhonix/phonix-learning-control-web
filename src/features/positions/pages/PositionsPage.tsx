'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumnsPositions } from '@/features/positions/config/tableColumnsPositions';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb, DataTable } from '@/lib/phonix-ui';
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
  const { crumbRoutes } = useBreadcrumbs([{ label: 'Cargos' }], { withLoader: true });

  const { data: positionsData, isLoading, isFetching } = useGetPositionsQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredPositions = companyId
    ? (positionsData?.data ?? []).filter((position: Positions) => position.companyId === companyId)
    : (positionsData?.data ?? []);

  return (
    <div className="mb-8 px-2 flex flex-col">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader
        title={`${t('p.positions')} - ${companyName}`}
        buttonLabel={t('a.addPosition')}
        buttonHref={`${baseRoute}/add`}
      />

      <DataTable
        striped
        data={filteredPositions}
        variant="primary"
        columns={tableColumnsPositions(t, currentUserId)}
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
