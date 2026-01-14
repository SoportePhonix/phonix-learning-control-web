import { useEffect, useMemo } from 'react';

import { CompaniesFormValues } from '@/components/companies/types';
import { FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { useTranslation } from '@/i18n';
import { useGetCompanyByIdQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { UseFormReturn } from 'react-hook-form';

import { companiesFormConfig } from '../config/companiesFormConfig';

type UseCompaniesFormProps = {
  mode: 'create' | 'edit';
  companyId?: string;
  form: UseFormReturn<CompaniesFormValues>;
};

export function useCompaniesForm({ mode, companyId, form }: UseCompaniesFormProps) {
  const { t } = useTranslation();

  const companyById = useGetCompanyByIdQuery(
    { companyId: companyId! },
    {
      skip: mode === 'create' || !companyId,
    }
  );

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    []
  );

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...companiesFormConfig };

    config.fields = config.fields.map((field) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }
      return field;
    });

    return config;
  }, [statusOptions]);

  useEffect(() => {
    if (mode === 'edit' && companyById.data?.data) {
      const company = companyById.data.data;

      const formData: CompaniesFormValues = {
        name: company.name || '',
        nit: company.nit || '',
        email: company.email || '',
        status: company.status || '',
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, companyById.data, form, companyId]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? companyById.isLoading : false,
    companyData: companyById.data?.data,
    currentStatus: companyById.data?.data?.status,
  };
}
