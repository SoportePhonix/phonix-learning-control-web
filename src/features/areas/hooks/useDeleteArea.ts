import { useTranslation } from '@/i18n';
import { useDeleteAreasMutation } from '@/lib/services/api/areasApi/areasApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteArea() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteAreasMutation, { isLoading, error }] = useDeleteAreasMutation();

  const deleteArea = async (areaId: number) => {
    try {
      await deleteAreasMutation({ id: areaId }).unwrap();
      toast.success(`${t('a.areaSuccessfullyRemoved')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('a.areaCouldNotBeDeleted')}`);
    }
  };

  return {
    deleteArea,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
