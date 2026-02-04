import { useEffect, useMemo } from 'react';

import { FieldConfig, FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { PositionsFormValues } from '@/components/positions/types';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useGetPositionByIdQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { UseFormReturn } from 'react-hook-form';

import { positionsFormConfig } from '../config/positionsFormConfig';

type UsePositionFormProps = {
  mode: 'create' | 'edit';
  positionId?: string;
  form: UseFormReturn<PositionsFormValues>;
};

export function usePositionForm({ mode, positionId, form }: UsePositionFormProps) {
  const { t } = useTranslation();

  const positionById = useGetPositionByIdQuery(
    { positionId: positionId! },
    {
      skip: mode === 'create' || !positionId,
    }
  );

  const companiesQuery = useGetCompaniesQuery();

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    [t]
  );

  const companyOptions: SelectOption[] = useMemo(() => {
    if (!companiesQuery.data?.data) return [];

    return companiesQuery.data.data.map((company) => ({
      value: company.id.toString(),
      label: company.name,
    }));
  }, [companiesQuery.data]);

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...positionsFormConfig };

    config.fields = config.fields.map((field: FieldConfig) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }
      if (field.name === 'companyId') {
        return { ...field, options: companyOptions };
      }
      return field;
    });

    return config;
  }, [statusOptions, companyOptions]);

  useEffect(() => {
    if (mode === 'edit' && positionById.data?.data) {
      const position = positionById.data.data;

      const formData: PositionsFormValues = {
        name: position.name || '',
        description: position.description || '',
        companyId: position.companyId?.toString() || '',
        status: position.status || '',
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, positionById.data, form, positionId]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? positionById.isLoading : false,
    isLoadingCompanies: companiesQuery.isLoading,
    positionData: positionById.data?.data,
    companiesData: companiesQuery.data?.data,
    currentStatus: positionById.data?.data?.status,
    companyOptions,
    statusOptions,
  };
}
