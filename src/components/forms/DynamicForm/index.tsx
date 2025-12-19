'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { TranslationKey } from '@/i18n';
import Link from 'next/link';
import { FieldValues } from 'react-hook-form';

import { FieldRenderer } from './FieldRenderer';
import { DynamicFormProps } from './types';

export function DynamicForm<T extends FieldValues>({
  config,
  mode,
  form,
  onSubmit,
  isLoading = false,
  apiError = null,
  cancelUrl,
  t,
  submitLabel,
  cancelLabel,
}: DynamicFormProps<T>) {
  const { handleSubmit } = form;

  const errorMessages: Record<number, TranslationKey> = {
    400: 'r.required',
    409: 'e.existingIdentificationDocument',
    500: 'i.internalServerErrorPleaseTryAgainLater',
  };

  const gridCols = config.columns === 1 ? 'grid-cols-1' : 'grid-cols-2';

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className={`w-full grid ${gridCols} gap-x-12 gap-y-6 px-12 py-10`}>
        {config.fields.map((field) => (
          <FieldRenderer key={field.name} field={field} form={form} mode={mode} t={t} />
        ))}

        {/* Mostrar error de API si existe */}
        {apiError && Object.keys(form.formState.errors).length === 0 && (
          <div className="col-span-full">
            <p className="text-sm text-var--red-error">
              {errorMessages[apiError] ? t(errorMessages[apiError]) : t('a.anUnknownErrorOccurred')}
            </p>
          </div>
        )}

        {/* Botones */}
        <div className={`${gridCols === 'grid-cols-2' ? 'col-span-2' : 'col-span-1'} flex justify-end gap-4 pt-8`}>
          <Link href={cancelUrl}>
            <Button type="button" variant="outline">
              {cancelLabel ? t(cancelLabel) : t('c.cancel')}
            </Button>
          </Link>

          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? mode === 'edit'
                ? t('u.updating')
                : t('c.creating')
              : submitLabel
                ? t(submitLabel)
                : mode === 'edit'
                  ? t('u.update')
                  : t('a.add')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
