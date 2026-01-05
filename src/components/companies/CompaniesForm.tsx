'use client';

import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TranslationKey } from '@/i18n';
import Link from 'next/link';
import { Controller, UseFormReturn } from 'react-hook-form';

import { CompaniesFormValues } from './types';

type FormMode = 'create' | 'edit';

type Props = {
  form: UseFormReturn<CompaniesFormValues>;
  onSubmit: (values: CompaniesFormValues) => void;
  isLoading?: boolean;
  apiError?: number | null;
  apiErrorMessage?: string | null;
  t: (key: TranslationKey) => string;
  mode?: FormMode;
};

export function CompaniesForm({ mode = 'create', form, onSubmit, isLoading, apiError, apiErrorMessage, t }: Props) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = form;

  const selectStyle =
    'h-10 w-full rounded-none border-0 border-b border-b-gray-400 bg-base-white px-3 text-sm text-gray-500';

  const nitValue = watch('nit');
  const prevNitRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (apiErrorMessage === 'El NIT ya existe') {
      setError('nit', {
        type: 'manual',
        message: apiErrorMessage,
      });
    }
  }, [apiErrorMessage, setError]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-x-12 gap-y-6 px-12 py-10">
        {/* Nombre */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {t('n.name')} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('name', { required: t('n.nameIsRequerid') })}
            error={errors.name?.message}
            placeholder={t('e.enterAValue')}
          />
        </div>

        {/* NIT */}
        <div className="col-span-1">
          <label className="text-sm font-medium">
            NIT <span className="text-red-500">*</span>
          </label>

          <Input
            {...register('nit', { required: t('r.required') })}
            error={errors.nit?.message}
            placeholder={t('e.enterAValue')}
          />
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {t('e.email')} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('email', { required: t('e.emailAddressRequired') })}
            error={errors.email?.message}
            placeholder={t('e.enterAValue')}
          />
        </div>

        {/* Status */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {t('s.status')} <span className="text-red-500">*</span>
          </label>

          <Controller
            control={control}
            name="status"
            rules={{ required: t('r.required') }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder={t('s.selectAnOption')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">{t('a.active')}</SelectItem>
                  <SelectItem value="INACTIVE">{t('i.inactive')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Botones */}
        <div className="col-span-2 flex justify-end gap-4 pt-8">
          <Link href="/companies">
            <Button type="button" variant="outline">
              {t('c.cancel')}
            </Button>
          </Link>

          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? mode === 'edit'
                ? t('u.updating')
                : t('c.creating')
              : mode === 'edit'
                ? t('u.update')
                : t('a.add')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
