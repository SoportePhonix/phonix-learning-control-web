import { useEffect, useMemo } from 'react';

import { CompaniesFormValues } from '@/components/companies/types';
import { FieldConfig, FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { useTranslation } from '@/i18n';
import { useGetCompanyByIdQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useGetInstancesQuery } from '@/lib/services/api/instanceApi/instanceApi';
import { Role, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { UseFormReturn } from 'react-hook-form';

import { companiesFormConfig } from '../config/companiesFormConfig';

type UseCompaniesFormProps = {
  mode: 'create' | 'edit';
  companyId?: string;
  form: UseFormReturn<CompaniesFormValues>;
};

export function useCompaniesForm({ mode, companyId, form }: UseCompaniesFormProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const companyById = useGetCompanyByIdQuery(
    { companyId: companyId! },
    {
      skip: mode === 'create' || !companyId,
    }
  );

  const roles = session?.user?.role || [];
  const isSuperAdmin = Array.isArray(roles) && roles.some((r: any) => normalizeRoleName(r.name) === Role.SUPERADMIN);

  const instancesQuery = useGetInstancesQuery(undefined, {
    skip: !isSuperAdmin,
  });

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    [t]
  );

  const instanceOptions: SelectOption[] = useMemo(() => {
    if (!instancesQuery.data?.data) return [];
    return instancesQuery.data.data.map((instance: any) => ({
      value: instance.id.toString(),
      label: instance.name,
    }));
  }, [instancesQuery.data]);

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...companiesFormConfig };
    let fields: FieldConfig[] = [...config.fields];

    if (isSuperAdmin) {
      if (!fields.find((f: FieldConfig) => f.name === 'instanceId')) {
        fields.push({
          name: 'instanceId',
          label: 'i.instance',
          type: 'select-search',
          placeholder: 'e.enterAValue',
          required: true,
          options: instanceOptions,
        });
      }
    }

    config.fields = fields.map((field: FieldConfig) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }
      if (field.name === 'instanceId') {
        return { ...field, options: instanceOptions, disabled: instancesQuery.isLoading };
      }
      return field;
    });

    return config;
  }, [statusOptions, instanceOptions, isSuperAdmin, instancesQuery.isLoading]);

  useEffect(() => {
    if (mode === 'edit' && companyById.data?.data) {
      const company = companyById.data.data;

      const formData: CompaniesFormValues = {
        name: company.name || '',
        nit: company.nit || '',
        email: company.email || '',
        status: company.status || '',
        ...(isSuperAdmin && (company as any).instanceId ? { instanceId: (company as any).instanceId.toString() } : {}),
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, companyById.data, form, companyId, isSuperAdmin]);

  return {
    formConfig,
    isLoadingData: (mode === 'edit' ? companyById.isLoading : false) || instancesQuery.isLoading,
    companyData: companyById.data?.data,
    currentStatus: companyById.data?.data?.status,
  };
}
