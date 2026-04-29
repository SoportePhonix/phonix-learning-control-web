'use client';

import { useState } from 'react';

import { CoursesFormValues } from '@/components/courses/types';
import { useCompanyNavigation } from '@/features/students/hooks/useCompanyNavigation';
import { TranslationKey, useTranslation } from '@/i18n';
import { useAddCoursesMutation } from '@/lib/services/api/coursesApi/coursesApi';
import { AddCoursesRequest } from '@/lib/services/api/coursesApi/interface';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateCourses(form: UseFormReturn<CoursesFormValues>) {
  const { t } = useTranslation();
  const companyNavigation = useCompanyNavigation();
  const [addCourses, { isLoading }] = useAddCoursesMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createCourse = async (values: CoursesFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const payload: AddCoursesRequest = {
        fullName: values.fullName,
        shortName: values.shortName,
        status: values.status,
        companyId: Number(values.companyId),
        ...(values.summary && { summary: values.summary }),
        ...(values.startDate && { startDate: values.startDate }),
        ...(values.endDate && { endDate: values.endDate }),
      };

      await addCourses(payload).unwrap();

      toast.success(`${values.fullName} ${t('a.addedSuccessfully')}`);
      companyNavigation.push('/manage-companies/courses');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      if (status === 409) {
        if (errorMessage.toLowerCase().includes('shortname')) {
          form.setError('shortName', {
            type: 'manual',
            message: t('e.existingShortName'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

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
