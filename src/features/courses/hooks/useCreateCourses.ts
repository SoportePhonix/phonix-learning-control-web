'use client';

import { useTranslation } from '@/i18n';
import { useAddCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { AddCompaniesRequest } from '@/lib/services/api/companiesApi/interface';
import { useAddCoursesMutation } from '@/lib/services/api/coursesApi/coursesApi';
import { AddCoursesRequest } from '@/lib/services/api/coursesApi/interface';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type FormValues = {
  fullName: string;
  shortName: string;
  categoryId: number;
  summary: string;
  visible: number;
  startDate: number;
  endDate: number;
};

export function useCreateCourses() {
  const { t } = useTranslation();
  const router = useRouter();
  const [addCourses, { isLoading, error }] = useAddCoursesMutation();

  const createCourses = async (values: FormValues) => {
    const payload: AddCoursesRequest = {
      fullName: values.fullName,
      shortName: values.shortName,
      categoryId: values.categoryId,
      summary: values.summary,
      visible: values.visible,
      startDate: values.startDate,
      endDate: values.endDate,
    };

    try {
      await addCourses(payload).unwrap();

      toast.success(`${values.fullName} ${t('a.addedSuccessfully')}`, {
        id: 'company-created-success',
      });

      router.push('/companies');
    } catch {
      toast.error(t('c.companyCreationFailed'));
    }
  };

  const rawMessage = (error as any)?.data?.message ?? null;
  const statusCode = (error as any)?.status ?? null;

  const isDuplicateShortName = typeof rawMessage === 'string' && rawMessage.toLowerCase().includes('duplicate key');

  return {
    createCourses,
    isLoading,

    apiError: statusCode,

    apiErrorMessage: isDuplicateShortName ? t('e.existingShortName') : rawMessage,
  };
}
