import { useTranslation } from '@/i18n';
import { useDeleteInstanceMutation } from '@/lib/services/api/instanceApi/instanceApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteInstance() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteInstanceMutation, { isLoading, error }] = useDeleteInstanceMutation();

  const deleteInstance = async (instanceId: string) => {
    const cleanId = instanceId.trim();

    try {
      const result = await deleteInstanceMutation({ id: cleanId }).unwrap();
      toast.success(`${t('i.instanceSuccessfullyRemoved')}`);
      router.refresh();
    } catch (err: any) {
      const status = err?.status || err?.data?.statusCode;
      const errorMessage = err?.data?.message || err?.data?.error?.message || err?.message || err?.error;

      if (status === 403) {
        toast.error(errorMessage || `${t('i.instanceDeleteForbidden')}`);
      } else if (status === 401) {
        toast.error('No autorizado. Por favor, inicia sesión nuevamente.');
      } else {
        toast.error(errorMessage || `${t('i.instanceCouldNotBeDeleted')}`);
      }
    }
  };
  return {
    deleteInstance,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
