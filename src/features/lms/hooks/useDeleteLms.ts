import { useTranslation } from '@/i18n';
import { useDeleteLmsMutation } from '@/lib/services/api/lmsApi/lmsApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteLms() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteLmsMutation, { isLoading, error }] = useDeleteLmsMutation();

  const deleteLms = async (lmsId: number) => {
    try {
      await deleteLmsMutation({ id: lmsId }).unwrap();
      toast.success(`${t('l.lmsSuccessfullyRemoved')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('l.lmsCouldNotBeDeleted')}`);
    }
  };

  return {
    deleteLms,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
