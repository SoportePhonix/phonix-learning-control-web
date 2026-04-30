'use client';

import { useState } from 'react';

import { PositionsFormValues } from '@/components/positions/types';
import { useCompanyNavigation } from '@/hooks/useCompanyNavigation';
import { TranslationKey, useTranslation } from '@/i18n';
import { UpdatePositionsRequest } from '@/lib/services/api/positionsApi/interface';
import { useUpdatePositionsMutation } from '@/lib/services/api/positionsApi/positionsApi';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useUpdatePosition(positionId: string, form: UseFormReturn<PositionsFormValues>) {
  const { t } = useTranslation();
  const companyNavigation = useCompanyNavigation();
  const [updatePosition, { isLoading }] = useUpdatePositionsMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const updatePositionData = async (values: PositionsFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      if (!values.companyId) {
        toast.error(t('p.pleaseSelectACompany'));
        return;
      }

      const payload: UpdatePositionsRequest = {
        id: Number(positionId),
        name: values.name,
        description: values.description,
        companyId: Number(values.companyId),
        status: values.status || 'active',
      };

      await updatePosition(payload).unwrap();

      toast.success(`${values.name} ${t('u.updatedSuccessfully')}`);
      companyNavigation.push('/manage-companies/positions');
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
      setApiErrorMessage('p.positionUpdateFailed');

      toast.error(`Error en la actualización de la posición (Status: ${status})`);
    }
  };

  return {
    updatePositionData,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
