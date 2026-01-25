import { useTranslation } from '@/i18n';
import { useDeleteStudentMutation } from '@/lib/services/api/studentsApi/studentsApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteStudent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteStudentMutation, { isLoading, error }] = useDeleteStudentMutation();

  const deleteStudent = async (studentId: number) => {
    try {
      await deleteStudentMutation({ id: studentId }).unwrap();
      toast.success(`${t('u.userSuccessfullyDeleted')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('t.theUserCouldNotBeDeleted')}`);
    }
  };

  return {
    deleteStudent,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
