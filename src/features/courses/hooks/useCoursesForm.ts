'use client';

import { useEffect, useMemo } from 'react';

import { CoursesFormValues } from '@/components/courses/types';
import { FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { useTranslation } from '@/i18n';
import { useGetCourseByIdQuery } from '@/lib/services/api/coursesApi/coursesApi';
import { UseFormReturn } from 'react-hook-form';

import { coursesFormConfig } from '../config/coursesFormConfig';

type UseCoursesFormProps = {
  mode: 'create' | 'edit';
  courseId?: string;
  form: UseFormReturn<CoursesFormValues>;
  companies?: any[];
  companyId?: number | null;
};

export function useCoursesForm({ mode, courseId, form, companies, companyId }: UseCoursesFormProps) {
  const { t } = useTranslation();
  const courseById = useGetCourseByIdQuery({ courseId: courseId! }, { skip: mode === 'create' || !courseId });

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    [t]
  );

  const companiesOptions: SelectOption[] = useMemo(
    () =>
      companies
        ?.filter((company) => company.status === 'active')
        .map((company) => ({
          value: String(company.id),
          label: company.name,
        })) ?? [],
    [companies]
  );

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...coursesFormConfig };

    // Hide companyId field in both create and edit modes
    // Create: company comes from URL context
    // Edit: company is set from course data in form.reset
    config.fields = config.fields.filter((field) => field.name !== 'companyId');

    // Apply status options to remaining fields
    config.fields = config.fields.map((field) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }
      return field;
    });

    return config;
  }, [mode, statusOptions]);

  useEffect(() => {
    if (mode !== 'edit' || !courseById.data?.data) return;

    const course = courseById.data.data;

    form.reset(
      {
        fullName: course.fullName ?? '',
        shortName: course.shortName ?? '',
        summary: course.summary ?? '',
        status: course.status || '',
        startDate: course.startDate ? course.startDate.split('T')[0] : '',
        endDate: course.endDate ? course.endDate.split('T')[0] : '',
        companyId: course.companyId
          ? String(course.companyId)
          : course.companies?.[0]?.id
            ? String(course.companies[0].id)
            : '',
      },
      { keepDefaultValues: false }
    );
  }, [mode, courseById.data, form]);

  // Pre-fill companyId when company context is active (create mode)
  useEffect(() => {
    if (mode === 'create' && companyId) {
      form.setValue('companyId', String(companyId), { shouldValidate: true });
    }
  }, [mode, companyId, form]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? courseById.isLoading : false,
    courseData: courseById.data?.data,
    currentStatus: courseById.data?.data?.status,
  };
}
