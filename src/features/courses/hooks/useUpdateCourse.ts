import { CoursesFormValues } from '@/components/courses/types';
import { useTranslation } from '@/i18n';
import { useUpdateCoursesMutation } from '@/lib/services/api/coursesApi/coursesApi';
import { UpdateCoursesRequest } from '@/lib/services/api/coursesApi/interface';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useUpdateCourse(courseId: string) {
  const { t } = useTranslation();
  const router = useRouter();

  const [updateCoursesMutation, { isLoading, error }] = useUpdateCoursesMutation();

  const updateCourse = async (values: CoursesFormValues) => {
    const payload: UpdateCoursesRequest = {
      id: Number(courseId),
      fullName: values.fullName,
      shortName: values.shortName,
      status: values.status ?? 'active',
      companyId: Number(values.companyId),
      ...(values.summary && { summary: values.summary }),
      ...(values.startDate && { startDate: values.startDate }),
      ...(values.endDate && { endDate: values.endDate }),
    };

    try {
      await updateCoursesMutation(payload).unwrap();

      toast.success(`${values.fullName} ${t('u.updatedSuccessfully')}`, {
        id: 'course-updated-success',
      });

      router.push('/courses');
    } catch {
      toast.error(t('c.courseUpdateFailed'), {
        id: 'courses-updated-error',
      });
    }
  };

  return {
    updateCourse,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
