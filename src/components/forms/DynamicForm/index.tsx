'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/lib/phonix-ui';
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
  apiErrorMessage,
  cancelUrl,
  t,
  submitLabel,
  submitLoadingLabel,
  cancelLabel,
  showCancelButton = true,
}: DynamicFormProps<T>) {
  const { handleSubmit } = form;

  // Determinar si mostrar el botón de cancelar
  const displayCancelButton = showCancelButton && cancelUrl;

  {
    apiError && (
      <div className="col-span-full absolute bottom-24">
        <p className="text-sm text-red-error">{apiErrorMessage ? t(apiErrorMessage) : t('a.anUnknownErrorOccurred')}</p>
      </div>
    );
  }

  const gridCols =
    config.columns === 1
      ? 'grid-cols-1'
      : config.columns === 3
        ? 'grid-cols-1 laptop:grid-cols-2 desktop-1920:grid-cols-3'
        : 'grid-cols-1 laptop:grid-cols-2';

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full grid ${gridCols} gap-x-12 gap-y-6 px-12 py-10 relative`}
      >
        {config.fields.map((field) => {
          if (field.hidden) return null;

          let spanClass = '';

          if (field.colSpan === 2) {
            spanClass =
              config.columns === 3
                ? 'col-span-1 laptop:col-span-2 desktop-1920:col-span-2'
                : config.columns === 2
                  ? 'col-span-1 laptop:col-span-2'
                  : 'col-span-1';
          } else if (field.colSpan === 3) {
            spanClass = 'col-span-1 laptop:col-span-2 desktop-1920:col-span-3';
          }

          return (
            <div key={field.name} className={spanClass}>
              <FieldRenderer field={field} form={form} mode={mode} t={t} />
            </div>
          );
        })}

        {apiError && (
          <div className="col-span-full absolute bottom-24">
            <p className="text-sm text-red-error">
              {apiErrorMessage ? t(apiErrorMessage) : t('a.anUnknownErrorOccurred')}
            </p>
          </div>
        )}

        {/* Botones */}
        <div
          className={`${displayCancelButton ? 'col-span-full' : config.columns === 3 ? 'col-span-1 laptop:col-span-2 desktop-1920:col-span-3' : config.columns === 2 ? 'col-span-1 laptop:col-span-2' : 'col-span-1'} flex justify-end gap-4 mt-4`}
        >
          {displayCancelButton && (
            <Link href={cancelUrl!}>
              <Button type="button" variant="primary">
                {cancelLabel ? t(cancelLabel) : t('c.cancel')}
              </Button>
            </Link>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            variant="secondary"
            {...(!displayCancelButton && { size: 'w-full' })}
          >
            {isLoading
              ? submitLoadingLabel
                ? t(submitLoadingLabel)
                : mode === 'edit'
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
