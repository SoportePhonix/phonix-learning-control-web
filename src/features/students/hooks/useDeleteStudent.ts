import { useTranslation } from '@/i18n';
import { useDeleteStudentMutation } from '@/lib/services/api/studentsApi/studentsApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteUser() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteStudentMutation, { isLoading, error }] = useDeleteStudentMutation();

  const deleteUser = async (userId: number) => {
    try {
      await deleteStudentMutation({ id: userId }).unwrap();
      toast.success(`${t('u.userSuccessfullyDeleted')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('t.theUserCouldNotBeDeleted')}`);
    }
  };

  return {
    deleteUser,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
