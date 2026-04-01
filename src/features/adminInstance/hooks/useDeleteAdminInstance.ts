'use client';

import { TranslationKey, useTranslation } from '@/i18n';
import { useDeleteAdminInstanceMutation } from '@/lib/services/api/adminInstanceApi/adminInstanceApi';
import { DeleteAdminInstanceRequest } from '@/lib/services/api/adminInstanceApi/interface';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteAdminInstance() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteMutation, { isLoading, error }] = useDeleteAdminInstanceMutation();

  const deleteAdminInstance = async (payload: DeleteAdminInstanceRequest) => {
    try {
      await deleteMutation(payload).unwrap();

      // Aseguramos un string genérico si no existe una key exacta en i18n
      toast.success(t('s.studentSuccessfullyDeleted' as TranslationKey) || 'Eliminado exitosamente');

      router.refresh();
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || t('e.errorOcurred' as TranslationKey) || 'Ocurrió un error al eliminar');
      return false;
    }
  };

  return {
    deleteAdminInstance,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
