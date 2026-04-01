'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumnsAreas } from '@/features/areas/config/tableColumnsAreas';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useTranslation } from '@/i18n';
import { DataTable } from '@/lib/phonix-ui';
import { useGetAreasQuery } from '@/lib/services/api/areasApi/areasApi';
import { Areas } from '@/lib/services/api/areasApi/interface';
import { useSessionContext } from '@/utils/context/sessionContext';

interface AreasPageProps {
  baseRoute?: string;
}

export default function AreasPage({ baseRoute = '/manage-companies/areas' }: AreasPageProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });

  const { data: areasData, isLoading, isFetching } = useGetAreasQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredAreas = companyId
    ? (areasData?.data ?? []).filter((area: Areas) => area.companyId === companyId)
    : (areasData?.data ?? []);

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader
        title={`${t('a.areas')} - ${companyName}`}
        buttonLabel={t('a.addArea')}
        buttonHref={`${baseRoute}/add`}
      />
      <DataTable
        striped
        data={filteredAreas}
        variant="primary"
        columns={tableColumnsAreas(t, currentUserId)}
        isLoading={isLoading || isFetching}
        storageKey="datatable-areas"
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
