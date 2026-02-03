import { useEffect, useMemo } from 'react';

import { AreasFormValues } from '@/components/areas/types';
import { FieldConfig, FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { useTranslation } from '@/i18n';
import { useGetAreaByIdQuery } from '@/lib/services/api/areasApi/areasApi';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { UseFormReturn } from 'react-hook-form';

import { areasFormConfig } from '../config/areasFormConfig';

type UseAreaFormProps = {
  mode: 'create' | 'edit';
  areaId?: string;
  form: UseFormReturn<AreasFormValues>;
};

export function useAreaForm({ mode, areaId, form }: UseAreaFormProps) {
  const { t } = useTranslation();

  // Obtener datos del área por ID (solo en modo edición)
  const areaById = useGetAreaByIdQuery(
    { areaId: areaId! },
    {
      skip: mode === 'create' || !areaId,
    }
  );

  // Obtener lista de empresas para el select
  const companiesQuery = useGetCompaniesQuery();

  // Opciones de estado
  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    [t]
  );

  // Opciones de empresas
  const companyOptions: SelectOption[] = useMemo(() => {
    if (!companiesQuery.data?.data) return [];

    return companiesQuery.data.data.map((company) => ({
      value: company.id.toString(),
      label: company.name,
    }));
  }, [companiesQuery.data]);

  // Configuración del formulario con opciones dinámicas
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

  // Llenar formulario en modo edición
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
