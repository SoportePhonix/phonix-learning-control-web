'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

interface SelectItemProps<T> {
  data: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  onSelect: (value: string, label: string) => void;
  placeholder?: string;
  selectedValue?: string;
  clearSelection?: boolean;
}

export function SelectSearch<T>({
  data,
  valueKey,
  labelKey,
  onSelect,
  placeholder = 'Seleccionar...',
  selectedValue: selectedValueProp,
  clearSelection = false,
}: SelectItemProps<T>) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [buttonWidth, setButtonWidth] = React.useState<number>(0);
  const [selectedValue, setSelectedValue] = React.useState<string>(selectedValueProp || '');
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useLayoutEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [open]);

  React.useEffect(() => {
    if (clearSelection) {
      setSelectedValue('');
    }
  }, [clearSelection]);

  const handleSelect = (selectedLabel: string) => {
    const selectedItem = data.find((item) => item[labelKey] === selectedLabel);
    if (selectedItem) {
      const value = String(selectedItem[valueKey]);
      const label = String(selectedItem[labelKey]);
      setSelectedValue(value);
      onSelect(value, label);
      setOpen(false);
    }
  };

  const displayValue = selectedValue
    ? String(data.find((item) => String(item[valueKey]) === selectedValue)?.[labelKey] || placeholder)
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="contour"
          role="combobox"
          aria-expanded={open}
          className={`${displayValue === placeholder ? 'text-primary-50/50' : 'text-primary-50 font-semibold'} w-full justify-between`}
        >
          {displayValue}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: buttonWidth }} className="p-1 shadow-primary-50 rounded-[0.5rem]">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>No hay opciones disponibles</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem key={String(item[valueKey])} value={String(item[labelKey])} onSelect={handleSelect}>
                  {String(item[labelKey])}
                  <Check
                    className={cn('ml-auto', selectedValue === String(item[valueKey]) ? 'opacity-100' : 'opacity-0')}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
