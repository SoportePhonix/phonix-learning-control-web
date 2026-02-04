import { useTranslation } from '@/i18n';
import { useDeletePositionsMutation } from '@/lib/services/api/positionsApi/positionsApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeletePosition() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deletePositionsMutation, { isLoading, error }] = useDeletePositionsMutation();

  const deletePosition = async (positionId: number) => {
    try {
      await deletePositionsMutation({ id: positionId }).unwrap();
      toast.success(`${t('p.positionSuccessfullyRemoved')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('p.positionCouldNotBeDeleted')}`);
    }
  };

  return {
    deletePosition,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
