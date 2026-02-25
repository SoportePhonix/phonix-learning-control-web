import { useEffect, useMemo } from 'react';

import { FieldConfig, FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { InstanceFormValues } from '@/components/instance/types';
import { useTranslation } from '@/i18n';
import { useGetInstanceByIdQuery } from '@/lib/services/api/instanceApi/instanceApi';
import { UseFormReturn } from 'react-hook-form';

import { instanceFormConfig } from '../config/instanceFormConfig';

type UseInstanceFormProps = {
  mode: 'create' | 'edit';
  instanceId?: string;
  form: UseFormReturn<InstanceFormValues>;
};

export function useInstanceForm({ mode, instanceId, form }: UseInstanceFormProps) {
  const { t } = useTranslation();

  const instanceById = useGetInstanceByIdQuery(
    { instanceId: instanceId! },
    {
      skip: mode === 'create' || !instanceId,
    }
  );

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    [t]
  );

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...instanceFormConfig };

    config.fields = config.fields.map((field: FieldConfig) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }
      return field;
    });

    return config;
  }, [statusOptions]);

  useEffect(() => {
    if (mode === 'edit' && instanceById.data?.data) {
      const instance = instanceById.data.data;

      const formData: InstanceFormValues = {
        nit: instance.nit || '',
        name: instance.name || '',
        description: instance.description || '',
        status: instance.status || '',
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, instanceById.data, form, instanceId]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? instanceById.isLoading : false,
    instanceData: instanceById.data?.data,
    currentStatus: instanceById.data?.data?.status,
    statusOptions,
  };
}
