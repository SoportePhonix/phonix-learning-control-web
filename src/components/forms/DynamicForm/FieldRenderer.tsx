'use client';

import { useEffect, useRef, useState } from 'react';

import { Textarea } from '@/components/ui';
import { TranslationKey } from '@/i18n';
import { Input, SelectSearch } from '@/lib/phonix-ui';
import { Select } from '@soportephonix/phx-select';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FieldConfig, SelectOption } from './types';

function MultiSelectSearch({
  options,
  selectedValues,
  onChange,
  label,
  placeholder,
  required,
  error,
}: MultiSelectSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const selectedLabels = options.filter((opt) => selectedValues.includes(String(opt.value))).map((opt) => opt.label);

  const displayValue =
    selectedValues.length === 0
      ? ''
      : selectedValues.length === 1
        ? selectedLabels[0]
        : `${selectedValues.length} seleccionados`;

  const handleSelect = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div className="grid gap-2" ref={containerRef}>
      <label className="text-base font-semibold text-primary">
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className={displayValue ? 'text-foreground' : 'text-muted-foreground'}>
            {displayValue || placeholder}
          </span>
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg">
            <div className="p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
                className="mb-2 w-full rounded-md border px-3 py-2 text-sm"
              />
            </div>
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">Sin resultados</div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(String(option.value));
                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      onClick={() => handleSelect(String(option.value))}
                      className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <span
                        className={`mr-2 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="h-3 w-3"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                      {option.label}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
}

type MultiSelectSearchProps = {
  options: SelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label: string;
  placeholder: string;
  required?: boolean;
  error?: string;
};

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

    if (field.validation.custom) {
      validationRules.validate = {
        ...validationRules.validate,
        custom: (value: any) => {
          const result = field.validation!.custom!(value);
          if (typeof result === 'string') {
            return t(result as TranslationKey);
          }
          return result;
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
      case 'select': {
        const options = typeof field.options === 'function' ? field.options() : (field.options ?? []);
        const currentValue = form.watch(fieldName);
        const hasValue = currentValue !== '' && currentValue !== null && currentValue !== undefined;

        return (
          <Select
            key={`${fieldName}-${hasValue ? 'set' : 'empty'}`}
            name={fieldName}
            options={options}
            control={control}
            errors={errors}
            label={t(field.label)}
            placeholder={field.placeholder ? t(field.placeholder) : t('s.selectAnOption')}
            required={isRequired}
            disabled={field.disabled}
          />
        );
      }

      case 'select-search': {
        const options = typeof field.options === 'function' ? field.options() : (field.options ?? []);
        const currentValue = form.watch(fieldName);
        const hasValue = currentValue !== '' && currentValue !== null && currentValue !== undefined;

        return (
          <Controller
            key={`${fieldName}-${hasValue ? 'set' : 'empty'}`}
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
                <SelectSearch
                  data={options}
                  valueKey="value"
                  labelKey="label"
                  selectedValue={selectValue}
                  onSelect={(value) => controllerField.onChange(value)}
                  label={t(field.label)}
                  placeholder={field.placeholder ? t(field.placeholder) : t('s.selectAnOption')}
                  error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
                  required={isRequired}
                />
              );
            }}
          />
        );
      }

      case 'multi-select-search': {
        const options = typeof field.options === 'function' ? field.options() : (field.options ?? []);
        const currentValue = form.watch(fieldName) as string[];
        const selectedValues = Array.isArray(currentValue) ? currentValue.map(String) : [];

        return (
          <Controller
            control={control}
            name={fieldName}
            rules={validationRules}
            render={({ field: controllerField }) => (
              <MultiSelectSearch
                options={options}
                selectedValues={selectedValues}
                onChange={(values) => controllerField.onChange(values)}
                label={t(field.label)}
                placeholder={field.placeholder ? t(field.placeholder) : t('s.selectAnOption')}
                required={isRequired}
                error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
              />
            )}
          />
        );
      }

      case 'textarea':
        return (
          <>
            <label className="text-base font-semibold text-primary">
              {t(field.label)}
              {isRequired && <span className="text-error">*</span>}
            </label>
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
          </>
        );

      case 'password':
        return (
          <Input
            type="password"
            {...register(fieldName, validationRules)}
            label={t(field.label)}
            required={isRequired}
            placeholder={
              mode === 'edit'
                ? t('l.leaveBlankToKeepCurrent')
                : field.placeholder
                  ? t(field.placeholder)
                  : t('e.enterAValue')
            }
            error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
            disabled={field.disabled}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            {...register(fieldName, validationRules)}
            label={t(field.label)}
            required={isRequired}
            placeholder={field.placeholder ? t(field.placeholder) : undefined}
            error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
            disabled={field.disabled}
          />
        );

      case 'text':
      case 'email':
      case 'number':
      default:
        return (
          <Input
            {...register(fieldName, validationRules)}
            label={t(field.label)}
            required={isRequired}
            placeholder={field.placeholder ? t(field.placeholder) : t('e.enterAValue')}
            error={typeof error?.message === 'string' ? resolveErrorMessage(error.message) : undefined}
            disabled={field.disabled}
          />
        );
    }
  };

  return <div className="grid gap-2">{renderField()}</div>;
}
