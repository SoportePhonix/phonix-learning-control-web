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
  companyId?: number | null;
};

export function usePositionForm({ mode, positionId, form, companyId }: UsePositionFormProps) {
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

    if (mode === 'create') {
      // In create mode, exclude companyId - company comes from URL context
      config.fields = config.fields
        .filter((field: FieldConfig) => field.name !== 'companyId')
        .map((field: FieldConfig) => {
          if (field.name === 'status') {
            return { ...field, options: statusOptions };
          }
          return field;
        });
    } else {
      // In edit mode, include all fields with options
      config.fields = config.fields.map((field: FieldConfig) => {
        if (field.name === 'status') {
          return { ...field, options: statusOptions };
        }
        if (field.name === 'companyId') {
          return { ...field, options: companyOptions };
        }
        return field;
      });
    }

    return config;
  }, [mode, statusOptions, companyOptions]);

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

  // Pre-fill companyId when company context is active (create mode)
  useEffect(() => {
    if (mode === 'create' && companyId) {
      form.setValue('companyId', String(companyId), { shouldValidate: true });
    }
  }, [mode, companyId, form]);

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
