'use client';

import { useMemo } from 'react';

import { PageHeader } from '@/components/page-header';
import { tableColumnsTrainingRoutes } from '@/features/trainingRoutes/config/tableColumnsTrainingRoutes';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useCompanyNavigation } from '@/hooks/useCompanyNavigation';
import { useTranslation } from '@/i18n';
import { Breadcrumb, DataTable } from '@/lib/phonix-ui';
import { useGetAreasQuery } from '@/lib/services/api/areasApi/areasApi';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useGetPositionsQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { useGetTrainingRoutesQuery } from '@/lib/services/api/trainingRoutesApi/trainingRoutesApi';

export default function Page() {
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { data: trainingRoutesData, isLoading, isFetching } = useGetTrainingRoutesQuery();
  const { data: companiesData } = useGetCompaniesQuery();
  const { data: areasData } = useGetAreasQuery();
  const { data: positionsData } = useGetPositionsQuery();

  const enrichedData = useMemo(() => {
    if (!trainingRoutesData?.data) return [];

    const companiesMap = new Map((companiesData?.data ?? []).map((c) => [c.id, c.name]));
    const areasMap = new Map((areasData?.data ?? []).map((a) => [a.id, a.name]));
    const positionsMap = new Map((positionsData?.data ?? []).map((p) => [p.id, p.name]));

    return trainingRoutesData.data.map((route) => ({
      ...route,
      companyName: companiesMap.get(route.companyId) ?? route.companyName,
      areaName: route.areaId ? (areasMap.get(route.areaId) ?? route.areaName) : route.areaName,
      positionName: route.positionId ? (positionsMap.get(route.positionId) ?? route.positionName) : route.positionName,
    }));
  }, [trainingRoutesData, companiesData, areasData, positionsData]);

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader
        title={t('t.trainingRoutes')}
        buttonLabel={t('a.addTrainingRoute')}
        buttonHref={companyNav.href('/manage-companies/training-routes/add')}
      />

      <DataTable
        striped
        data={enrichedData}
        variant="primary"
        columns={tableColumnsTrainingRoutes(t, companyNav.href)}
        isLoading={isLoading || isFetching}
        storageKey="datatable-training-routes"
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
