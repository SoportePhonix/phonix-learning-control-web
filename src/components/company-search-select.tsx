'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Command as CommandPrimitive } from 'cmdk';
import { Check, Search } from 'lucide-react';

export interface CompanySearchSelectProps<T> {
  data: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  onSelect: (value: string, label: string) => void;
  placeholder?: string;
  selectedValue?: string;
  clearSelection?: boolean;
  label?: string;
  floatingLabel?: string;
  error?: string;
  required?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  icon?: 'select' | 'search';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  autoFocusInput?: boolean;
  contentOnly?: boolean;
}

const triggerVariantClasses: Record<string, string> = {
  'primary-value':
    'bg-phx-blanco text-phx-verde-base border-b border-b-phx-textos-bajo hover:border-b-phx-verde-base focus:border-b-phx-verde-base',
  'primary-placeholder':
    'bg-phx-blanco text-phx-textos-bajo border-b border-b-phx-textos-bajo hover:border-b-phx-verde-base focus:border-b-phx-verde-base',
  'secondary-value':
    'bg-transparent text-phx-azul-textos-medio border-b border-b-phx-textos-bajo  hover:border-b-phx-verde-base focus:border-b-phx-verde-base',
  'secondary-placeholder': 'bg-transparent text-phx-textos-bajo border-b border-b-phx-textos-bajo',
};

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      className={className}
    >
      <path
        d="M3.5 5.25L7 8.75L10.5 5.25"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ContentProps<T> {
  data: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  onSelect: (value: string, label: string) => void;
  selectedValue?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  autoFocusInput?: boolean;
}

export function CompanySearchSelectContent<T>({
  data,
  valueKey,
  labelKey,
  onSelect,
  selectedValue,
  variant = 'primary',
  autoFocusInput = false,
}: ContentProps<T>) {
  const [selected, setSelected] = React.useState(selectedValue || '');

  React.useEffect(() => {
    setSelected(selectedValue || '');
  }, [selectedValue]);

  const handleSelect = (labelValue: string) => {
    const match = data.find((item) => String(item[labelKey]) === labelValue);
    if (!match) return;

    const value = String(match[valueKey]);
    const labelText = String(match[labelKey]);
    setSelected(value);
    onSelect(value, labelText);
  };

  const commandVariant = variant === 'secondary' || variant === 'tertiary' ? 'secondary' : 'primary';
  const commandClasses = 'bg-phx-blanco text-phx-textos-bajo dark:bg-phx-gris-base';

  return (
    <CommandPrimitive
      data-slot="command"
      className={cn('flex h-full w-full flex-col overflow-hidden rounded-sm', commandClasses)}
    >
      <div
        data-slot="command-input-wrapper"
        className={cn(
          'flex items-center gap-2 border-b border-phx-gris-bajo px-3 py-3 text-base text-phx-verde-base bg-phx-blanco'
        )}
      >
        <Search className="size-4 shrink-0 text-phx-textos-bajo" />
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            'placeholder:text-phx-textos-bajo flex w-full rounded-xs bg-transparent outline-hidden disabled:cursor-not-allowed disabled:opacity-50'
          )}
          placeholder="Buscar..."
          autoFocus={autoFocusInput}
        />
      </div>

      <CommandPrimitive.List
        data-slot="command-list"
        className="max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto"
      >
        <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-base">
          No hay opciones disponibles
        </CommandPrimitive.Empty>

        <CommandPrimitive.Group
          data-slot="command-group"
          className="[&_[cmdk-group-heading]]:text-phx-verde-base overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-light text-phx-verde-base"
        >
          {data.map((item) => (
            <CommandPrimitive.Item
              key={String(item[valueKey])}
              data-slot="command-item"
              value={String(item[labelKey])}
              onSelect={handleSelect}
              className=" data-[selected=true]:text-phx-verde-base [&_svg:not([class*='text-'])]:text-phx-blanco relative flex cursor-default items-center gap-2 rounded-sm px-2 py-2 text-base outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 text-phx-verde-base hover:bg-phx-textos-bajo hover:text-phx-verde-base transition-colors [&:has(svg.opacity-100)]:bg-phx-verde-base/70 [&:has(svg.opacity-100)]:text-phx-blanco font-light"
            >
              {String(item[labelKey])}
              <Check className={cn('ml-auto', selected === String(item[valueKey]) ? 'opacity-100' : 'opacity-0')} />
            </CommandPrimitive.Item>
          ))}
        </CommandPrimitive.Group>
      </CommandPrimitive.List>
    </CommandPrimitive>
  );
}

export function CompanySearchSelect<T>({
  data,
  valueKey,
  labelKey,
  onSelect,
  placeholder = 'Seleccionar...',
  selectedValue,
  clearSelection = false,
  label,
  floatingLabel,
  error,
  required,
  variant = 'primary',
  icon = 'select',
  open,
  onOpenChange,
  autoFocusInput = false,
  contentOnly = false,
}: CompanySearchSelectProps<T>) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(selectedValue || '');
  const [contentWidth, setContentWidth] = React.useState(0);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  React.useLayoutEffect(() => {
    if (triggerRef.current) {
      setContentWidth(triggerRef.current.offsetWidth);
    }
  }, [isOpen]);

  React.useEffect(() => {
    setSelected(selectedValue || '');
  }, [selectedValue]);

  React.useEffect(() => {
    if (clearSelection) {
      setSelected('');
    }
  }, [clearSelection]);

  const handleSelect = (labelValue: string) => {
    const match = data.find((item) => String(item[labelKey]) === labelValue);
    if (!match) return;

    const value = String(match[valueKey]);
    const labelText = String(match[labelKey]);
    setSelected(value);
    onSelect(value, labelText);
    setOpen(false);
  };

  const selectedLabel = selected
    ? String(data.find((item) => String(item[valueKey]) === selected)?.[labelKey] ?? placeholder)
    : placeholder;

  const isPlaceholder = selectedLabel === placeholder;
  const triggerVariant = variant === 'tertiary' ? 'secondary' : variant;
  const triggerKey = `${triggerVariant}-${isPlaceholder ? 'placeholder' : 'value'}`;

  if (contentOnly) {
    return (
      <CompanySearchSelectContent
        data={data}
        valueKey={valueKey}
        labelKey={labelKey}
        onSelect={handleSelect}
        selectedValue={selectedValue}
        variant={variant}
        autoFocusInput={autoFocusInput}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-start gap-2">
      {label ? (
        <label className="block font-semibold text-phx-verde-base mb-0 text-base">
          {label}
          {required ? <span className="text-phx-error ml-0.5">*</span> : null}
        </label>
      ) : null}

      <PopoverPrimitive.Root open={isOpen} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <div className="relative flex w-full">
            {floatingLabel ? (
              <div
                className="absolute -top-2 left-3 px-1 text-xs font-medium text-phx-verde-base/70 z-10
                        [text-shadow:_0_0_0_white,_1px_0_0_white,_-1px_0_0_white,_0_1px_0_white,_0_-1px_0_white,_1px_1px_0_white,_-1px_1px_0_white,_1px_-1px_0_white,_-1px_-1px_0_white]"
              >
                {floatingLabel}
              </div>
            ) : null}

            <button
              ref={triggerRef}
              className={cn(
                'w-full flex items-center justify-start gap-2 font-normal text-base transition-all duration-200',
                'rounded-t-sm py-3 px-3',
                'focus:outline-none disabled:cursor-not-allowed disabled:opacity-100 cursor-pointer',
                '[&_svg]:pointer-events-none [&_svg]:shrink-0',
                triggerVariantClasses[triggerKey]
              )}
              type="button"
              aria-expanded={isOpen}
            >
              <span className="text-left truncate flex-1">{selectedLabel}</span>
              {icon === 'search' ? (
                <Search className="size-4 text-phx-textos-bajo shrink-0" />
              ) : (
                <ChevronIcon className="text-phx-textos-bajo shrink-0" />
              )}
            </button>
          </div>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="center"
            sideOffset={4}
            style={{ width: contentWidth }}
            className={cn(
              'bg-blanco text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden',
              'p-0 border-phx-border shadow-md rounded-xl'
            )}
          >
            <CompanySearchSelectContent
              data={data}
              valueKey={valueKey}
              labelKey={labelKey}
              onSelect={handleSelect}
              selectedValue={selectedValue}
              variant={variant}
              autoFocusInput={autoFocusInput && isOpen}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {error ? <span className="text-sm text-phx-error block">{error}</span> : null}
    </div>
  );
}
