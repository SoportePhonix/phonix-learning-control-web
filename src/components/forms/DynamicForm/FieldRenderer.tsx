'use client';

import { Textarea } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TranslationKey } from '@/i18n';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FieldConfig } from './types';

type FieldRendererProps<T extends FieldValues> = {
  field: FieldConfig;
  form: UseFormReturn<T>;
  mode: 'create' | 'edit';
  t: (key: TranslationKey) => string;
};

export function FieldRenderer<T extends FieldValues>({ field, form, mode, t }: FieldRendererProps<T>) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const fieldName = field.name as Path<T>;
  const error = errors[fieldName];

  // Determinar si el campo es requerido según el modo
  const isRequired = typeof field.required === 'boolean' ? field.required : (field.required?.[mode] ?? false);

  // Validaciones
  const validationRules: any = {
    required: isRequired ? t(field.label) + ' ' + t('i.isRequired') : false,
  };

  if (field.validation) {
    if (field.validation.pattern) {
      validationRules.pattern = {
        value: field.validation.pattern,
        message: t('i.invalidFormat'),
      };
    }
    if (field.validation.minLength) {
      validationRules.minLength = {
        value: field.validation.minLength,
        message: `${t('m.minimumLength')}: ${field.validation.minLength}`,
      };
    }
    if (field.validation.maxLength) {
      validationRules.maxLength = {
        value: field.validation.maxLength,
        message: `${t('m.maximumLength')}: ${field.validation.maxLength}`,
      };
    }
    if (field.validation.min !== undefined) {
      validationRules.min = {
        value: field.validation.min,
        message: `${t('m.minimumValue')}: ${field.validation.min}`,
      };
    }
    if (field.validation.max !== undefined) {
      validationRules.max = {
        value: field.validation.max,
        message: `${t('m.maximumValue')}: ${field.validation.max}`,
      };
    }
  }

  const selectStyle =
    'h-10 w-full rounded-none border-0 border-b border-b-gray-400 bg-white px-3 text-sm text-gray-500';

  // Renderizar según tipo de campo
  const renderField = () => {
    switch (field.type) {
      case 'select':
        const options = typeof field.options === 'function' ? field.options() : (field.options ?? []);

        return (
          <Controller
            control={control}
            name={fieldName}
            rules={validationRules}
            render={({ field: controllerField }) => {
              // Convertir el valor a string solo si existe y no está vacío
              // De lo contrario, usar undefined para que el Select muestre el placeholder
              const selectValue =
                controllerField.value !== undefined &&
                controllerField.value !== null &&
                String(controllerField.value).trim() !== ''
                  ? String(controllerField.value)
                  : undefined;

              return (
                <Select
                  key={`${fieldName}-${selectValue || 'empty'}`}
                  value={selectValue}
                  onValueChange={controllerField.onChange}
                  disabled={field.disabled}
                >
                  <SelectTrigger className={selectStyle}>
                    <SelectValue placeholder={field.placeholder ? t(field.placeholder) : t('s.selectAnOption')} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...register(fieldName, validationRules)}
            placeholder={field.placeholder ? t(field.placeholder) : t('e.enterAValue')}
            disabled={field.disabled}
            rows={field.rows ?? 4}
            className={field.className}
          />
        );

      case 'text':
      case 'email':
      case 'password':
      case 'number':
      default:
        return (
          <Input
            type={field.type}
            {...register(fieldName, validationRules)}
            placeholder={
              mode === 'edit' && field.type === 'password'
                ? t('l.leaveBlankToKeepCurrent')
                : field.placeholder
                  ? t(field.placeholder)
                  : t('e.enterAValue')
            }
            error={error?.message as string}
            disabled={field.disabled}
            className={field.className}
          />
        );
    }
  };

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium">
        {t(field.label)}
        {isRequired && <span className="text-red-500">*</span>}
        {mode === 'edit' && field.type === 'password' && !isRequired && (
          <span className="text-sm text-gray-500 ml-2">({t('o.optional')})</span>
        )}
      </label>

      {renderField()}

      {error && field.type !== 'text' && field.type !== 'email' && field.type !== 'password' && (
        <p className="text-sm text-var--red-error">{error.message as string}</p>
      )}
    </div>
  );
}
