'use client';

import { useState } from 'react';

import { InstanceFormValues } from '@/components/instance/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { useUpdateInstanceMutation } from '@/lib/services/api/instanceApi/instanceApi';
import { UpdateInstanceRequest } from '@/lib/services/api/instanceApi/interface';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useUpdateInstance(instanceId: string, form: UseFormReturn<InstanceFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [updateInstance, { isLoading }] = useUpdateInstanceMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const translateServerError = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('nit') && lowerMessage.includes('longer than or equal to 3 characters')) {
      return t('n.nitMustBeLongerThanOrEqualTo3Characters');
    }

    return message;
  };

  const updateInstanceData = async (values: InstanceFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const payload: UpdateInstanceRequest = {
        id: Number(instanceId),
        name: values.name,
        description: values.description,

        ...(values.status && { status: values.status }),
      } as unknown as UpdateInstanceRequest;

      await updateInstance(payload).unwrap();

      toast.success(`${values.name} ${t('u.updatedSuccessfully')}`);
      router.push('/instances');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      if (status === 400) {
        if (
          errorMessage.toLowerCase().includes('nit') &&
          errorMessage.toLowerCase().includes('longer than or equal to 3 characters')
        ) {
          toast.error(`Error del servidor: ${t('n.nitMustBeLongerThanOrEqualTo3Characters')}`);
          form.setError('nit', {
            type: 'manual',
            message: t('n.nitMustBeLongerThanOrEqualTo3Characters'),
          });
          return;
        }
      }

      if (status === 409) {
        if (errorMessage.toLowerCase().includes('name')) {
          toast.error(`Error del servidor: ${t('e.existingInstanceName')}`);
          form.setError('name', {
            type: 'manual',
            message: t('e.existingInstanceName'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      // Fallback for other errors
      if (err?.data?.message) {
        const translatedMessage = translateServerError(err.data.message);
        toast.error(`Error del servidor: ${translatedMessage}`);
      }

      setApiError(status);
      setApiErrorMessage('i.instanceUpdateFailed');
      toast.error(`Error en la actualización de la instancia (Status: ${status})`);
    }
  };

  return {
    updateInstanceData,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
