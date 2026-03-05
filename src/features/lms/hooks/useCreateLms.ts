'use client';

import { useState } from 'react';

import { LmsFormValues } from '@/components/lms/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { AddLmsRequest } from '@/lib/services/api/lmsApi/interface';
import { useAddLmsMutation } from '@/lib/services/api/lmsApi/lmsApi';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { handleLmsApiError, handleServerValidationError, validateAndNormalizeUrl } from '../utils/lmsValidation';

export function useCreateLms(form: UseFormReturn<LmsFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addLms, { isLoading }] = useAddLmsMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createLms = async (values: LmsFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      if (!values.companyId) {
        toast.error(t('p.pleaseSelectACompany'));
        return;
      }

      const normalizedUrl = validateAndNormalizeUrl(values.url, form, t);
      if (!normalizedUrl) return;

      const payload: AddLmsRequest = {
        name: values.name,
        type: values.type,
        url: normalizedUrl,
        token: values.token,
        lmsIdExternal: values.lmsIdExternal,
        companyIds: [Number(values.companyId)],
        ...(values.status && { status: values.status }),
      };

      await addLms(payload).unwrap();

      toast.success(`${values.name} ${t('a.addedSuccessfully')}`);
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
      setApiErrorMessage('l.lmsCreationFailed');
      toast.error(t('l.lmsCreationFailed'));
    }
  };

  return {
    createLms,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
