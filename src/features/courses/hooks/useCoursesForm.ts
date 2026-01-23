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
  companies: any[];
};

export function useCoursesForm({ mode, courseId, form, companies }: UseCoursesFormProps) {
  const { t } = useTranslation();
  const courseById = useGetCourseByIdQuery({ courseId: courseId! }, { skip: mode === 'create' || !courseId });

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

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    []
  );

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...coursesFormConfig };

    config.fields = config.fields.map((field) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }

      if (field.name === 'companyId') {
        return {
          ...field,
          options: companiesOptions,
          required: true,
        };
      }

      return field;
    });

    return config;
  }, [statusOptions, companiesOptions]);

  useEffect(() => {
    if (mode !== 'edit' || !courseById.data?.data) return;

    const course = courseById.data.data;

    form.reset(
      {
        fullName: course.fullName ?? '',
        shortName: course.shortName ?? '',
        categoryId: String(course.categoryId ?? ''),
        summary: course.summary ?? '',
        status: course.status || '',
        startDate: course.startDate ? course.startDate.split('T')[0] : '',
        endDate: course.endDate ? course.endDate.split('T')[0] : '',
        companyId: course.companies?.[0]?.id ? String(course.companies[0].id) : '',
      },
      { keepDefaultValues: false }
    );
  }, [mode, courseById.data, form]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? courseById.isLoading : false,
    courseData: courseById.data?.data,
    currentStatus: courseById.data?.data?.status,
  };
}
