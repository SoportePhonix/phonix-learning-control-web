import { useEffect, useMemo } from 'react';

import { AreasFormValues } from '@/components/areas/types';
import { FieldConfig, FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { useTranslation } from '@/i18n';
import { useGetAreaByIdQuery } from '@/lib/services/api/areasApi/areasApi';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { Session, useSessionContext } from '@/utils/context/sessionContext';
import { UseFormReturn } from 'react-hook-form';

import { areasFormConfig } from '../config/areasFormConfig';

type UseAreaFormProps = {
  mode: 'create' | 'edit';
  areaId?: string;
  form: UseFormReturn<AreasFormValues>;
  session?: Session | null;
  companyId?: number | null;
};

export function useAreaForm({ mode, areaId, form, session, companyId }: UseAreaFormProps) {
  const { t } = useTranslation();
  const { hasRole } = useRBAC();
  const { session: contextSession } = useSessionContext();
  const resolvedSession = session ?? contextSession;
  const isSuperadmin = hasRole('superadmin');

  const areaById = useGetAreaByIdQuery(
    { areaId: areaId! },
    {
      skip: mode === 'create' || !areaId,
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

    const activeCompanies = companiesQuery.data.data.filter((company) => company.status === 'active');

    // Filter by session for non-superadmin
    if (isSuperadmin) {
      return activeCompanies.map((company) => ({
        value: company.id.toString(),
        label: company.name,
      }));
    }

    return activeCompanies
      .filter((company) => resolvedSession?.user?.companies?.some((uc: any) => uc.id === company.id))
      .map((company) => ({
        value: company.id.toString(),
        label: company.name,
      }));
  }, [companiesQuery.data, resolvedSession, isSuperadmin]);

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...areasFormConfig };

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
    if (mode === 'edit' && areaById.data?.data) {
      const area = areaById.data.data;

      const formData: AreasFormValues = {
        name: area.name || '',
        description: area.description || '',
        companyId: area.companyId?.toString() || '',
        status: area.status || '',
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, areaById.data, form, areaId]);

  // Pre-fill companyId when company context is active (create mode)
  useEffect(() => {
    if (mode === 'create' && companyId) {
      form.setValue('companyId', String(companyId), { shouldValidate: true });
    }
  }, [mode, companyId, form]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? areaById.isLoading : false,
    isLoadingCompanies: companiesQuery.isLoading,
    areaData: areaById.data?.data,
    companiesData: companiesQuery.data?.data,
    currentStatus: areaById.data?.data?.status,
    companyOptions,
    statusOptions,
  };
}
