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
                <div className="flex flex-col space-y-1 relative">
                  <Select
                    key={`${fieldName}-${selectValue || 'empty'}`}
                    value={selectValue}
                    onValueChange={controllerField.onChange}
                    disabled={field.disabled}
                  >
                    <SelectTrigger className={error ? 'border-b-error' : ''}>
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
                  {error && !field.errorTooltip && (
                    <span className="absolute top-full left-0 text-sm text-error whitespace-pre-line ">
                      {typeof error?.message === 'string' ? resolveErrorMessage(error.message) : ''}
                    </span>
                  )}
                  {error && field.errorTooltip && (
                    <div className="absolute top-full left-0 flex items-center gap-1 text-sm text-error group cursor-help">
                      <span>{field.errorTooltipTrigger ? t(field.errorTooltipTrigger) : 'Review field'}</span>
                      <div className="relative inline-block">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="invisible group-hover:visible absolute left-0 top-6 z-50 w-72 p-3 text-sm bg-base-white border border-gray-200 rounded-md shadow-lg text-gray-700 whitespace-normal">
                          {typeof error?.message === 'string' ? resolveErrorMessage(error.message) : ''}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...register(fieldName, validationRules)}
            placeholder={field.placeholder ? t(field.placeholder) : t('e.enterAValue')}
            error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
            disabled={field.disabled}
            rows={field.rows ?? 4}
            className={field.className}
            errorTooltip={field.errorTooltip}
            errorTooltipTrigger={field.errorTooltipTrigger ? t(field.errorTooltipTrigger) : undefined}
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

      {/* Los errores de select ya se manejan dentro del componente */}
    </div>
  );
}
