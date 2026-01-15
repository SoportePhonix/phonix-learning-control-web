'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TranslationKey } from '@/i18n';
import Link from 'next/link';
import { Controller, UseFormReturn } from 'react-hook-form';

import { CoursesFormValues } from './types';

type FormMode = 'create' | 'edit';

type Props = {
  form: UseFormReturn<CoursesFormValues>;
  onSubmit: (values: CoursesFormValues) => void;
  isLoading?: boolean;
  apiError?: number | null;
  apiErrorMessage?: string | null;
  t: (key: TranslationKey) => string;
  mode?: FormMode;
};

export function CoursesForm({ mode = 'create', form, onSubmit, isLoading, apiError, apiErrorMessage, t }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const selectStyle =
    'h-10 w-full rounded-none border-0 border-b border-b-gray-400 bg-base-white px-3 text-sm text-gray-500';

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-2 gap-x-12 gap-y-6 px-12 py-10">
        {/* Full name */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {t('f.fullName')} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('fullName', { required: t('r.required') })}
            error={errors.fullName?.message}
            placeholder={t('e.enterAValue')}
          />
        </div>

        {/* Short name */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {t('s.shortName')} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('shortName', { required: t('r.required') })}
            error={errors.shortName?.message}
            placeholder={t('e.enterAValue')}
          />
        </div>

        {/* Category */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {t('c.categoryId')} <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            {...register('categoryId', { required: t('r.required'), valueAsNumber: true })}
            error={errors.categoryId?.message}
            placeholder={t('e.enterAValue')}
          />
        </div>

        {/* Visible */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            {t('v.visible')} <span className="text-red-500">*</span>
          </label>

          <Controller
            control={control}
            name="visible"
            rules={{ required: t('r.required') }}
            render={({ field }) => (
              <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder={t('s.selectAnOption')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{t('a.active')}</SelectItem>
                  <SelectItem value="0">{t('i.inactive')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Summary */}
        <div className="grid gap-2 col-span-2">
          <label className="text-sm font-medium">{t('s.summary')}</label>
          <Input {...register('summary')} error={errors.summary?.message} placeholder={t('e.enterAValue')} />
        </div>

        {/* Start date */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">{t('s.startDate')}</label>
          <Input type="date" {...register('startDate', { valueAsNumber: true })} error={errors.startDate?.message} />
        </div>

        {/* End date */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">{t('e.endDate')}</label>
          <Input type="date" {...register('endDate', { valueAsNumber: true })} error={errors.endDate?.message} />
        </div>

        {/* Actions */}
        <div className="col-span-2 flex justify-end gap-4 pt-8">
          <Link href="/courses">
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
