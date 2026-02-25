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

  const updateInstanceData = async (values: InstanceFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const payload = {
        nit: instanceId,
        name: values.name,
        description: values.description,
        ...(values.status && { status: values.status }),
      } as unknown as UpdateInstanceRequest;

      await updateInstance(payload).unwrap();

      toast.success(`${values.name} ${t('u.updatedSuccessfully')}`);
      router.push('/instance');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      if (err?.data?.message) {
        toast.error(`Error del servidor: ${err.data.message}`);
      }

      if (status === 409) {
        if (errorMessage.toLowerCase().includes('nit')) {
          form.setError('nit', {
            type: 'manual',
            message: t('e.existingInstanceNit'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
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
