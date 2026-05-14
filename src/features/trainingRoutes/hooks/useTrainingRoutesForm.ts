import { useEffect, useMemo } from 'react';

import { FieldConfig, FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { TrainingRouteFormValues } from '@/components/trainingRoutes/types';
import { useTranslation } from '@/i18n';
import { useGetAreasQuery } from '@/lib/services/api/areasApi/areasApi';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useGetPositionsQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { useGetTrainingRoutesByCompanyQuery } from '@/lib/services/api/trainingRoutesApi/trainingRoutesApi';
import { UseFormReturn } from 'react-hook-form';

import { trainingRoutesFormConfig } from '../config/trainingRoutesFormConfig';

type UseTrainingRoutesFormProps = {
  mode: 'create' | 'edit';
  id?: string;
  form: UseFormReturn<TrainingRouteFormValues>;
  companyId?: string | null;
};

export function useTrainingRoutesForm({ mode, id, form, companyId }: UseTrainingRoutesFormProps) {
  const { t } = useTranslation();

  const trainingRoutesQuery = useGetTrainingRoutesByCompanyQuery(
    { companyId: Number(companyId) },
    {
      skip: mode === 'create' || !companyId,
    }
  );

  const trainingRouteData = useMemo(() => {
    if (!id || !trainingRoutesQuery.data?.data) return undefined;
    return trainingRoutesQuery.data.data.find((route) => route.id === Number(id));
  }, [id, trainingRoutesQuery.data]);

  const companiesQuery = useGetCompaniesQuery();
  const areasQuery = useGetAreasQuery();
  const positionsQuery = useGetPositionsQuery();

  const companyOptions: SelectOption[] = useMemo(() => {
    if (!companiesQuery.data?.data) return [];
    return companiesQuery.data.data.map((company) => ({
      value: company.id.toString(),
      label: company.name,
    }));
  }, [companiesQuery.data]);

  const areaOptions: SelectOption[] = useMemo(() => {
    if (!areasQuery.data?.data) return [];
    return areasQuery.data.data.map((area) => ({
      value: area.id.toString(),
      label: area.name,
    }));
  }, [areasQuery.data]);

  const positionOptions: SelectOption[] = useMemo(() => {
    if (!positionsQuery.data?.data) return [];
    return positionsQuery.data.data.map((position) => ({
      value: position.id.toString(),
      label: position.name,
    }));
  }, [positionsQuery.data]);

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...trainingRoutesFormConfig };

    let fields = config.fields;

    if (mode === 'edit') {
      fields = fields.filter((field: FieldConfig) => field.name !== 'companyId');
    }

    config.fields = fields.map((field: FieldConfig) => {
      if (field.name === 'companyId') {
        return { ...field, options: companyOptions };
      }
      if (field.name === 'areaId') {
        return { ...field, options: areaOptions };
      }
      if (field.name === 'positionId') {
        return { ...field, options: positionOptions };
      }
      return field;
    });

    return config;
  }, [companyOptions, areaOptions, positionOptions, mode]);

  useEffect(() => {
    if (mode === 'edit' && trainingRouteData) {
      const formData: TrainingRouteFormValues = {
        name: trainingRouteData.name || '',
        description: trainingRouteData.description || '',
        companyId: trainingRouteData.companyId?.toString() || '',
        areaId: trainingRouteData.areaId?.toString() || '',
        positionId: trainingRouteData.positionId?.toString() || '',
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, trainingRouteData, form, id]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? trainingRoutesQuery.isLoading : false,
    isLoadingCompanies: companiesQuery.isLoading,
    trainingRouteData,
    companyOptions,
    areaOptions,
    positionOptions,
  };
}
