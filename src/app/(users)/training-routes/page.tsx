'use client';

import { useMemo } from 'react';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsTrainingRoutes } from '@/features/trainingRoutes/config/tableColumnsTrainingRoutes';
import { useTranslation } from '@/i18n';
import { useGetAreasQuery } from '@/lib/services/api/areasApi/areasApi';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useGetPositionsQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { useGetTrainingRoutesQuery } from '@/lib/services/api/trainingRoutesApi/trainingRoutesApi';
import { Route } from 'lucide-react';

export default function Page() {
  const { t } = useTranslation();

  const { data: trainingRoutesData } = useGetTrainingRoutesQuery();
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
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={t('t.trainingRoutes')} />

      <CreateButton href="/training-routes/add" label={t('a.addTrainingRoute')} icon={<Route />} align="right" />

      <DataTable data={enrichedData} columns={tableColumnsTrainingRoutes(t)} />
    </div>
  );
}
