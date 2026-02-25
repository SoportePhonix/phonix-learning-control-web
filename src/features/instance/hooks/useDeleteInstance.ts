import { useTranslation } from '@/i18n';
import { useDeleteInstanceMutation } from '@/lib/services/api/instanceApi/instanceApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteInstance() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteInstanceMutation, { isLoading, error }] = useDeleteInstanceMutation();

  const deleteInstance = async (instanceNit: string) => {
    try {
      await deleteInstanceMutation({ nit: instanceNit }).unwrap();
      toast.success(`${t('i.instanceSuccessfullyRemoved')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('i.instanceCouldNotBeDeleted')}`);
    }
  };

  return {
    deleteInstance,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
