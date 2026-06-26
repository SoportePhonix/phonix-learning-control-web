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
    if (!areasQuery.data?.data || !companyId) return [];
    return areasQuery.data.data
      .filter((area) => area.companyId === Number(companyId))
      .map((area) => ({
        value: area.id.toString(),
        label: area.name,
      }));
  }, [areasQuery.data, companyId]);

  const positionOptions: SelectOption[] = useMemo(() => {
    if (!positionsQuery.data?.data || !companyId) return [];
    return positionsQuery.data.data
      .filter((position) => position.companyId === Number(companyId))
      .map((position) => ({
        value: position.id.toString(),
        label: position.name,
      }));
  }, [positionsQuery.data, companyId]);

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...trainingRoutesFormConfig };

    // Hide companyId field in both create and edit modes
    // Create: company comes from URL context
    // Edit: company is set from training route data in form.reset
    config.fields = config.fields
      .filter((field: FieldConfig) => field.name !== 'companyId')
      .map((field: FieldConfig) => {
        if (field.name === 'areaId') {
          return { ...field, options: areaOptions };
        }
        if (field.name === 'positionId') {
          return { ...field, options: positionOptions };
        }
        return field;
      });

    return config;
  }, [mode, areaOptions, positionOptions]);

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

  // Pre-fill companyId when company context is active (create mode)
  useEffect(() => {
    if (mode === 'create' && companyId) {
      form.setValue('companyId', companyId, { shouldValidate: true });
    }
  }, [mode, companyId, form]);

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
