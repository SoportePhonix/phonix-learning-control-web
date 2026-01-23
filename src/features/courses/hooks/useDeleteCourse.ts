import { useTranslation } from '@/i18n';
import { useDeleteCoursesMutation } from '@/lib/services/api/coursesApi/coursesApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteCourse() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteCoursesMutation, { isLoading, error }] = useDeleteCoursesMutation();

  const deleteCourse = async (courseId: number) => {
    try {
      await deleteCoursesMutation({ id: courseId }).unwrap();
      toast.success(`${t('c.courseSuccessfullyRemoved')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('t.theCourseCouldNotBeDeleted')}`);
    }
  };

  return {
    deleteCourse,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
