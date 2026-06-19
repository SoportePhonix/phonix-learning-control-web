import { useEffect, useMemo } from 'react';

import { FieldConfig, FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { LmsFormValues } from '@/components/lms/types';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useGetLmsByIdQuery } from '@/lib/services/api/lmsApi/lmsApi';
import { UseFormReturn } from 'react-hook-form';

import { lmsFormConfig } from '../config/lmsFormConfig';

type UseLmsFormProps = {
  mode: 'create' | 'edit';
  lmsId?: string;
  form: UseFormReturn<LmsFormValues>;
};

export function useLmsForm({ mode, lmsId, form }: UseLmsFormProps) {
  const { t } = useTranslation();

  const lmsById = useGetLmsByIdQuery(
    { lmsId: lmsId! },
    {
      skip: mode === 'create' || !lmsId,
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
    const config = { ...lmsFormConfig };

    config.fields = config.fields.map((field: FieldConfig) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }
      if (field.name === 'companyIds') {
        // En modo edición, company es opcional porque el API no lo devuelve
        return {
          ...field,
          options: companyOptions,
          required: mode === 'create',
          placeholder: mode === 'edit' ? 't.tokenEditPlaceholder' : 'e.enterAValue',
        };
      }
      // En modo edición, token es opcional porque el API no lo devuelve por seguridad
      if (field.name === 'token') {
        return {
          ...field,
          required: mode === 'create',
          placeholder: mode === 'edit' ? 't.tokenEditPlaceholder' : 'e.enterAValue',
        };
      }
      return field;
    });

    return config;
  }, [statusOptions, companyOptions, mode]);

  useEffect(() => {
    if (mode === 'edit' && lmsById.data?.data) {
      const lms = lmsById.data.data;

      const formData: LmsFormValues = {
        name: lms.name || '',
        type: lms.type || '',
        url: lms.url || '',
        token: lms.token || '',
        lmsIdExternal: lms.lmsIdExternal || '',
        companyIds: lms.companyIds?.map(String) || [],
        status: lms.status || '',
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, lmsById.data, form, lmsId]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? lmsById.isLoading : false,
    isLoadingCompanies: companiesQuery.isLoading,
    lmsData: lmsById.data?.data,
    companiesData: companiesQuery.data?.data,
    currentStatus: lmsById.data?.data?.status,
    companyOptions,
    statusOptions,
  };
}
