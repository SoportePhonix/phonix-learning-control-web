'use client';

import { Textarea } from '@/components/ui';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
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

  const resolveErrorMessage = (message?: string) => {
    if (!message) return undefined;

    if (message.includes('.')) {
      return t(message as TranslationKey);
    }

    return message;
  };

  const isRequired = typeof field.required === 'boolean' ? field.required : (field.required?.[mode] ?? false);

  const validationRules: any = {
    required: isRequired ? t(field.label) + ' ' + t('i.isRequired') : false,
  };

  if (field.validation) {
    if (field.validation.pattern) {
      validationRules.validate = {
        pattern: (value: string) => {
          if (!value && !isRequired) return true;

          if (value && field.validation?.pattern && !field.validation.pattern.test(value)) {
            return field.validation.patternMessage ? t(field.validation.patternMessage) : t('i.invalidFormat');
          }
          return true;
        },
      };
    }
    if (field.validation.minLength) {
      validationRules.minLength = {
        value: field.validation.minLength,
        message: field.validation.minLengthMessage
          ? t(field.validation.minLengthMessage)
          : `${t('m.minimumLength')}: ${field.validation.minLength}`,
      };
    }
    if (field.validation.maxLength) {
      validationRules.maxLength = {
        value: field.validation.maxLength,
        message: field.validation.maxLengthMessage
          ? t(field.validation.maxLengthMessage)
          : `${t('m.maximumLength')}: ${field.validation.maxLength}`,
      };
    }
    if (field.validation.min !== undefined) {
      validationRules.min = {
        value: field.validation.min,
        message: field.validation.minMessage
          ? t(field.validation.minMessage)
          : `${t('m.minimumValue')}: ${field.validation.min}`,
      };
    }
    if (field.validation.max !== undefined) {
      validationRules.max = {
        value: field.validation.max,
        message: field.validation.maxMessage
          ? t(field.validation.maxMessage)
          : `${t('m.maximumValue')}: ${field.validation.max}`,
      };
    }
  }

  const selectStyle =
    'h-10 w-full rounded-none border-0 border-b border-b-gray-400 bg-base-white px-3 text-sm text-[#3A484C]';

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
                  <SelectContent className="rounded-lg border-verde_base/30 bg-brand z-50 text-[#3A484C]">
                    {options.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)} className="bg-base-white">
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

      case 'password':
        return (
          <InputPassword
            {...register(fieldName, validationRules)}
            placeholder={
              mode === 'edit'
                ? t('l.leaveBlankToKeepCurrent')
                : field.placeholder
                  ? t(field.placeholder)
                  : t('e.enterAValue')
            }
            error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
            disabled={field.disabled}
            className={field.className}
            errorTooltip={field.errorTooltip}
            errorTooltipTrigger={field.errorTooltipTrigger ? t(field.errorTooltipTrigger) : undefined}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            {...register(fieldName, validationRules)}
            placeholder={field.placeholder ? t(field.placeholder) : undefined}
            error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
            disabled={field.disabled}
            className={field.className}
            errorTooltip={field.errorTooltip}
            errorTooltipTrigger={field.errorTooltipTrigger ? t(field.errorTooltipTrigger) : undefined}
          />
        );

      case 'text':
      case 'email':
      case 'number':
      default:
        return (
          <Input
            type={field.type}
            {...register(fieldName, validationRules)}
            placeholder={field.placeholder ? t(field.placeholder) : t('e.enterAValue')}
            error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
            disabled={field.disabled}
            className={field.className}
            errorTooltip={field.errorTooltip}
            errorTooltipTrigger={field.errorTooltipTrigger ? t(field.errorTooltipTrigger) : undefined}
          />
        );
    }
  };

  return (
    <div className="grid gap-2">
      <label className="text-sm text-label">
        {t(field.label)}
        {isRequired && <span className="text-error">*</span>}
        {mode === 'edit' && field.type === 'password' && !isRequired && (
          <span className="text-sm text-label ml-2">({t('o.optional')})</span>
        )}
      </label>

      {renderField()}

      {typeof error?.message === 'string' &&
        field.type !== 'text' &&
        field.type !== 'email' &&
        field.type !== 'number' &&
        field.type !== 'password' && <p className="text-sm text-error">{resolveErrorMessage(error.message)}</p>}
    </div>
  );
}
