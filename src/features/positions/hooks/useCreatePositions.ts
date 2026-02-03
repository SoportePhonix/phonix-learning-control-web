'use client';

import { useState } from 'react';

import { PositionsFormValues } from '@/components/positions/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { AddPositionsRequest } from '@/lib/services/api/positionsApi/interface';
import { useAddPositionsMutation } from '@/lib/services/api/positionsApi/positionsApi';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreatePositions(form: UseFormReturn<PositionsFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addPosition, { isLoading }] = useAddPositionsMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createPosition = async (values: PositionsFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      if (!values.companyId) {
        toast.error(t('p.pleaseSelectACompany'));
        return;
      }

      const payload: AddPositionsRequest = {
        name: values.name,
        description: values.description,
        companyId: Number(values.companyId),
        ...(values.status && { status: values.status }),
      };

      await addPosition(payload).unwrap();

      toast.success(t('p.positionCreatedSuccessfully'));
      router.push('/positions');
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
            message: t('e.existingPositionName'),
          });
          return;
        }

        if (errorMessage.toLowerCase().includes('position') && errorMessage.toLowerCase().includes('exists')) {
          form.setError('name', {
            type: 'manual',
            message: t('e.existingPositionName'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      setApiError(status);
      setApiErrorMessage('p.positionCreationFailed');

      toast.error(`Error en la creación de la posición (Status: ${status})`);
    }
  };

  return {
    createPosition,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
