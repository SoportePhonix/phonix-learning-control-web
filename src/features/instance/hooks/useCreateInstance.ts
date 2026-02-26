'use client';

import { useState } from 'react';

import { InstanceFormValues } from '@/components/instance/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { useAddInstanceMutation } from '@/lib/services/api/instanceApi/instanceApi';
import { AddInstanceRequest } from '@/lib/services/api/instanceApi/interface';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateInstance(form: UseFormReturn<InstanceFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addInstance, { isLoading }] = useAddInstanceMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createInstance = async (values: InstanceFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const payload: AddInstanceRequest = {
        nit: values.nit,
        name: values.name,
        description: values.description,
        ...(values.status && { status: values.status }),
      };

      await addInstance(payload).unwrap();

      toast.success(`${values.name} ${t('a.addedSuccessfully')}`);
      router.push('/instances');
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
      setApiErrorMessage('i.instanceCreationFailed');

      toast.error(`Error en la creación de la instancia (Status: ${status})`);
    }
  };

  return {
    createInstance,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
