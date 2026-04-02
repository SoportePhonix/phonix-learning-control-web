import { useTranslation } from '@/i18n';
import { useAddEnrollmentMutation } from '@/lib/services/api/enrollmentApi/enrollmentApi';
import { toast } from 'sonner';

export function useEnrollStudent() {
  const { t } = useTranslation();
  const [addEnrollmentMutation, { isLoading }] = useAddEnrollmentMutation();

  const enrollStudent = async (studentId: number, courseId: number, onSuccess?: () => void) => {
    try {
      await addEnrollmentMutation({ studentId, courseId }).unwrap();
      toast.success(t('e.enrollmentSuccessful'));
      onSuccess?.();
    } catch (err: any) {
      console.log('Enrollment error:', err);
      const status = err?.status;
      if (status === 409) {
        toast.error(t('e.enrollmentAlreadyExists'));
      } else {
        toast.error(t('e.enrollmentFailed'));
      }
    }
  };

  return {
    enrollStudent,
    isLoading,
  };
}
