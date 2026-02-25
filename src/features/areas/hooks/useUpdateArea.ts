'use client';

import { useState } from 'react';

import { AreasFormValues } from '@/components/areas/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { useUpdateAreasMutation } from '@/lib/services/api/areasApi/areasApi';
import { UpdateAreasRequest } from '@/lib/services/api/areasApi/interface';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useUpdateArea(areaId: string, form: UseFormReturn<AreasFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [updateArea, { isLoading }] = useUpdateAreasMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const updateAreaData = async (values: AreasFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      if (!values.companyId) {
        toast.error(t('p.pleaseSelectACompany'));
        return;
      }

      const payload: UpdateAreasRequest = {
        id: Number(areaId),
        name: values.name,
        description: values.description,
        companyId: Number(values.companyId),
        status: values.status || 'active',
      };

      await updateArea(payload).unwrap();

      toast.success(`${values.name} ${t('u.updatedSuccessfully')}`);
      router.push('/manage-companies/areas');
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
      setApiErrorMessage('a.areaUpdateFailed');

      toast.error(`Error en la actualización del área (Status: ${status})`);
    }
  };

  return {
    updateAreaData,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
