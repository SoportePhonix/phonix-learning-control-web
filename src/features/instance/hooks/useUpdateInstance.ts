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

  // Función para traducir mensajes comunes del servidor
  const translateServerError = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    // Detectar error de longitud mínima del NIT
    if (lowerMessage.includes('nit') && lowerMessage.includes('longer than or equal to 3 characters')) {
      return t('n.nitMustBeLongerThanOrEqualTo3Characters');
    }

    // Si no hay traducción específica, retornar el mensaje original
    return message;
  };

  const updateInstanceData = async (values: InstanceFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const payload = {
        id: instanceId,
        nit: values.nit,
        name: values.name,
        description: values.description,
        ...(values.status && { status: values.status }),
      } as UpdateInstanceRequest;

      await updateInstance(payload).unwrap();

      toast.success(`${values.name} ${t('u.updatedSuccessfully')}`);
      router.push('/instances');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      if (err?.data?.message) {
        const translatedMessage = translateServerError(err.data.message);
        toast.error(`Error del servidor: ${translatedMessage}`);
      }

      // Manejar error de NIT con espacios (400)
      if (status === 400) {
        if (errorMessage.toLowerCase().includes('nit') && errorMessage.toLowerCase().includes('espacio')) {
          form.setError('nit', {
            type: 'manual',
            message: errorMessage,
          });
          return;
        }

        // Manejar error de longitud mínima del NIT
        if (
          errorMessage.toLowerCase().includes('nit') &&
          errorMessage.toLowerCase().includes('longer than or equal to 3 characters')
        ) {
          form.setError('nit', {
            type: 'manual',
            message: t('n.nitMustBeLongerThanOrEqualTo3Characters'),
          });
          return;
        }
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
