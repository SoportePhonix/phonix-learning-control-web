'use client';

import { useState } from 'react';

import { TranslationKey, useTranslation } from '@/i18n';
import { useCreateAdminInstanceMutation } from '@/lib/services/api/adminInstanceApi/adminInstanceApi';
import { AddAdminInstanceRequest } from '@/lib/services/api/adminInstanceApi/interface';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useCreateAdminInstance() {
  const { t } = useTranslation();
  const router = useRouter();
  const [createAdminInstanceMutation, { isLoading, error }] = useCreateAdminInstanceMutation();

  const [apiError, setApiError] = useState<number | null>(null);

  const createAdminInstance = async (payload: AddAdminInstanceRequest) => {
    try {
      setApiError(null);
      await createAdminInstanceMutation(payload).unwrap();

      // Aseguramos un string genérico si no existe una key exacta en i18n
      toast.success(t('a.addedSuccessfully' as TranslationKey) || 'Agregado exitosamente');

      router.refresh();
      return true;
    } catch (err: any) {
      const status = err?.status ?? 500;
      setApiError(status);
      toast.error(err?.data?.message || t('e.errorOcurred' as TranslationKey) || 'Ocurrió un error');
      return false;
    }
  };

  return {
    createAdminInstance,
    isLoading,
    apiError,
    error,
  };
}
