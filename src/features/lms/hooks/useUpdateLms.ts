'use client';

import { useState } from 'react';

import { LmsFormValues } from '@/components/lms/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { UpdateLmsRequest } from '@/lib/services/api/lmsApi/interface';
import { useUpdateLmsMutation } from '@/lib/services/api/lmsApi/lmsApi';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { handleLmsApiError, handleServerValidationError, isValidUrl, normalizeUrl } from '../utils/lmsValidation';

export function useUpdateLms(lmsId: string, form: UseFormReturn<LmsFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [updateLms, { isLoading }] = useUpdateLmsMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const updateLmsData = async (values: LmsFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const normalizedUrl = normalizeUrl(values.url);

      if (!isValidUrl(normalizedUrl)) {
        form.setError('url', {
          type: 'manual',
          message: t('u.urlMustBeValid'),
        });
        return;
      }

      // lmsIdExternal is auto-generated from name on the backend
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { lmsIdExternal: _lmsIdExternal, ...rest } = values;

      const payload: UpdateLmsRequest = {
        id: Number(lmsId),
        name: rest.name,
        type: rest.type,
        url: normalizedUrl,
        status: rest.status || 'active',
        ...(rest.token && { token: rest.token }),
        ...(rest.companyId && { companyIds: [Number(rest.companyId)] }),
      };

      await updateLms(payload).unwrap();

      toast.success(`${values.name} ${t('u.updatedSuccessfully')}`);
      router.push('/lms');
    } catch (err: any) {
      const status = err?.status ?? 500;

      // Traducir y mostrar mensaje de error del servidor
      if (err?.data?.message) {
        const translatedError = handleServerValidationError(err.data.message, form, t);
        toast.error(translatedError);
        return;
      }

      if (handleLmsApiError(err, form, t)) return;

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      setApiError(status);
      setApiErrorMessage('l.lmsUpdateFailed');
      toast.error(t('l.lmsUpdateFailed'));
    }
  };

  return {
    updateLmsData,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
