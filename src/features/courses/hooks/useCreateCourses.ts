'use client';

import { useState } from 'react';

import { CoursesFormValues } from '@/components/courses/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { useAddCoursesMutation } from '@/lib/services/api/coursesApi/coursesApi';
import { AddCoursesRequest } from '@/lib/services/api/coursesApi/interface';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateCourses(form: UseFormReturn<CoursesFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addCourses, { isLoading }] = useAddCoursesMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createCourse = async (values: CoursesFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      // 👇 protección de tipos (clave)
      if (!values.startDate || !values.endDate) {
        setApiErrorMessage('c.courseCreationFailed');
        return;
      }

      const payload: AddCoursesRequest = {
        fullName: values.fullName,
        shortName: values.shortName,
        categoryId: Number(values.categoryId),
        summary: values.summary,
        visible: Number(values.visible),
        startDate: values.startDate,
        endDate: values.endDate,
      };

      await addCourses(payload).unwrap();

      toast.success(t('c.courseCreatedSuccessfully'));
      router.push('/courses');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      // 409 → errores de campo
      if (status === 409) {
        if (errorMessage.toLowerCase().includes('shortName')) {
          form.setError('shortName', {
            type: 'manual',
            message: t('e.existingShortName'),
          });
          return;
        }

        if (
          errorMessage.toLowerCase().includes('course with this shortname already exists') ||
          errorMessage.toLowerCase().includes('shortName')
        ) {
          form.setError('shortName', {
            type: 'manual',
            message: t('e.existingShortName'),
          });
          return;
        }
      }

      // 500 → toast de error inesperado
      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      // Otros errores → mensaje global
      setApiError(status);
      setApiErrorMessage('c.courseCreationFailed');
    }
  };

  return {
    createCourse,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
