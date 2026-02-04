'use client';

import { useState } from 'react';

import { AreasFormValues } from '@/components/areas/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { useAddAreasMutation } from '@/lib/services/api/areasApi/areasApi';
import { AddAreasRequest } from '@/lib/services/api/areasApi/interface';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateAreas(form: UseFormReturn<AreasFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addArea, { isLoading }] = useAddAreasMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createArea = async (values: AreasFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      if (!values.companyId) {
        toast.error(t('p.pleaseSelectACompany'));
        return;
      }

      const payload: AddAreasRequest = {
        name: values.name,
        description: values.description,
        companyId: Number(values.companyId),
        ...(values.status && { status: values.status }),
      };

      await addArea(payload).unwrap();

      toast.success(t('a.areaCreatedSuccessfully'));
      router.push('/areas');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      if (err?.data?.message) {
        toast.error(`Error del servidor: ${err.data.message}`);
      }

      if (status === 409) {
        if (errorMessage.toLowerCase().includes('name')) {
          form.setError('name', {
            type: 'manual',
            message: t('e.existingAreaName'),
          });
          return;
        }

        if (errorMessage.toLowerCase().includes('area') && errorMessage.toLowerCase().includes('exists')) {
          form.setError('name', {
            type: 'manual',
            message: t('e.existingAreaName'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      setApiError(status);
      setApiErrorMessage('a.areaCreationFailed');

      toast.error(`Error en la creación del área (Status: ${status})`);
    }
  };

  return {
    createArea,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
