import { TranslationKey } from '@/i18n';
import { UseFormReturn } from 'react-hook-form';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';

export type FieldRequirement = boolean | { create: boolean; edit: boolean };

export type SelectOption = {
  value: string | number;
  label: string;
};

export type FieldValidation = {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  custom?: (value: any) => boolean | string;
};

export type FieldConfig = {
  name: string;
  label: TranslationKey;
  type: FieldType;
  placeholder?: TranslationKey;
  required?: FieldRequirement;
  options?: SelectOption[] | (() => SelectOption[]); // Estático o función para cargar dinámicamente
  validation?: FieldValidation;
  disabled?: boolean;
  rows?: number; // Para textarea
  className?: string; // Clases adicionales
};

export type FormConfig = {
  fields: FieldConfig[];
  columns?: 1 | 2; // Grid de columnas
};

export type DynamicFormProps<T extends Record<string, any>> = {
  config: FormConfig;
  mode: 'create' | 'edit';
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  isLoading?: boolean;
  apiError?: number | null;
  cancelUrl: string;
  t: (key: TranslationKey) => string;
  submitLabel?: TranslationKey;
  cancelLabel?: TranslationKey;
};
