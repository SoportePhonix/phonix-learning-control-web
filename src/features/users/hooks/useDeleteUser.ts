import { useTranslation } from '@/i18n';
import { useDeleteUserMutation } from '@/lib/services/api/usersApi/usersApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteUser() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteUserMutation, { isLoading, error }] = useDeleteUserMutation();

  const deleteUser = async (userId: number) => {
    try {
      await deleteUserMutation({ id: userId }).unwrap();
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
