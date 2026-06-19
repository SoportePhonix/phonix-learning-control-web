'use client';

import { useState } from 'react';

import { Textarea } from '@/components/ui';
import { TranslationKey } from '@/i18n';
import { Input, SelectSearch } from '@/lib/phonix-ui';
import { cn } from '@/lib/utils';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Select } from '@soportephonix/phx-select';
import { Check, ChevronDown, Search } from 'lucide-react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { FieldConfig, SelectOption } from './types';

type MultiSelectSearchProps = {
  options: SelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label: string;
  placeholder: string;
  required?: boolean;
  error?: string;
};

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
    <div className="grid gap-2">
      <label className="text-base font-light text-primary">
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-between whitespace-nowrap rounded-t-lg border-0 border-b border-b-[#3A484C] bg-white px-3 text-base shadow-sm transition-colors placeholder:text-placeholder hover:border-primary-100 focus:border-blue_cta outline-none focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className={displayValue ? 'font-semibold' : 'text-placeholder'}>{displayValue || placeholder}</span>
            <ChevronDown className="h-5 w-5 opacity-50" />
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Content
          className="z-50 w-full rounded-md border border-[#3A484C] bg-white p-0 shadow-md outline-none"
          side="bottom"
          sideOffset={0}
          align="start"
        >
          <div className="flex items-center border-b border-[#3A484C]/20 px-3 py-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-base font-light placeholder:text-placeholder outline-none"
            />
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-3 text-base font-light text-placeholder">Sin resultados</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(String(option.value));
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    onClick={() => handleSelect(String(option.value))}
                    className={cn(
                      'relative flex w-full cursor-default select-none items-center py-3 pl-10 pr-3 text-base font-light outline-none hover:bg-gray-50',
                      isSelected && 'bg-gray-50'
                    )}
                  >
                    <span className="absolute left-3 flex h-4 w-4 items-center justify-center rounded border border-[#3A484C]/50">
                      {isSelected && <Check className="h-3 w-3 text-[#3A484C]" />}
                    </span>
                    <span className={cn('text-base', isSelected && 'font-normal')}>{option.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Root>
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
}

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
