import { useMemo } from 'react';

import { CompaniesFormValues } from '@/components/companies/types';
import { FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { UseFormReturn } from 'react-hook-form';

import { companiesFormConfig } from '../config/companiesFormConfig';

type UseCompaniesFormProps = {
  form: UseFormReturn<CompaniesFormValues>;
};

export function useCompaniesForm({ form }: UseCompaniesFormProps) {
  /** Opciones estáticas para status */
  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: 'Activo' },
      { value: 'inactive', label: 'Inactivo' },
    ],
    []
  );

  /** Config del formulario */
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

  return {
    formConfig,
  };
}
