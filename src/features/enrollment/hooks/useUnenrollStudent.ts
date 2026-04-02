import { useTranslation } from '@/i18n';
import { useDeleteEnrollmentMutation } from '@/lib/services/api/enrollmentApi/enrollmentApi';
import { toast } from 'sonner';

export function useUnenrollStudent() {
  const { t } = useTranslation();
  const [deleteEnrollmentMutation, { isLoading }] = useDeleteEnrollmentMutation();

  const unenrollStudent = async (studentId: number, courseId: number, onSuccess?: () => void) => {
    try {
      await deleteEnrollmentMutation({ studentId, courseId }).unwrap();
      toast.success(t('e.unenrollmentSuccessful'));
      onSuccess?.();
    } catch (err: any) {
      const status = err?.status;
      if (status === 404) {
        toast.error(t('e.unenrollmentNotFound'));
      } else {
        toast.error(t('e.unenrollmentFailed'));
      }
    }
  };

  return {
    unenrollStudent,
    isLoading,
  };
}
