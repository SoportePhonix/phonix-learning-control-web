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
  patternMessage?: TranslationKey; // Mensaje personalizado para validación de pattern
  minLength?: number;
  minLengthMessage?: TranslationKey; // Mensaje personalizado para minLength
  maxLength?: number;
  maxLengthMessage?: TranslationKey; // Mensaje personalizado para maxLength
  min?: number;
  minMessage?: TranslationKey; // Mensaje personalizado para min
  max?: number;
  maxMessage?: TranslationKey; // Mensaje personalizado para max
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
  errorTooltip?: boolean; // Mostrar error en tooltip en lugar de inline
  errorTooltipTrigger?: TranslationKey; // Mensaje corto para trigger del tooltip
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
