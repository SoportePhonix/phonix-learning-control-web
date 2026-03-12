import { useTranslation } from '@/i18n';
import { useDeleteTrainingRouteMutation } from '@/lib/services/api/trainingRoutesApi/trainingRoutesApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteTrainingRoute() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteTrainingRouteMutation, { isLoading, error }] = useDeleteTrainingRouteMutation();

  const deleteTrainingRoute = async (id: number) => {
    try {
      await deleteTrainingRouteMutation({ id }).unwrap();
      toast.success(`${t('t.trainingRouteSuccessfullyRemoved')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('t.trainingRouteCouldNotBeDeleted')}`);
    }
  };

  return {
    deleteTrainingRoute,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
