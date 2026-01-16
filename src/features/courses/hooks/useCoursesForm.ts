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
};

export function useCoursesForm({ mode, courseId, form }: UseCoursesFormProps) {
  const { t } = useTranslation();

  const courseById = useGetCourseByIdQuery(
    { courseId: courseId! },
    {
      skip: mode === 'create' || !courseId,
    }
  );

  /** OPTIONS */
  const visibleOptions: SelectOption[] = useMemo(
    () => [
      { value: '1', label: t('a.active') },
      { value: '0', label: t('i.inactive') },
    ],
    [t]
  );

  /** FORM CONFIG */
  const formConfig: FormConfig = useMemo(() => {
    const config = { ...coursesFormConfig };

    config.fields = config.fields.map((field) => {
      if (field.name === 'visible') {
        return { ...field, options: visibleOptions };
      }
      return field;
    });

    return config;
  }, [visibleOptions]);

  /** EDIT MODE → RESET FORM */
  useEffect(() => {
    if (mode === 'edit' && courseById.data?.data) {
      const course = courseById.data.data;

      const formData: CoursesFormValues = {
        fullName: course.fullName || '',
        shortName: course.shortName || '',
        categoryId: String(course.categoryId ?? ''),
        summary: course.summary || '',
        visible: String(course.visible ?? '1'),
        startDate: course.startDate ? new Date(course.startDate).toISOString().substring(0, 10) : '',
        endDate: course.endDate ? new Date(course.endDate).toISOString().substring(0, 10) : '',
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, courseById.data, form, courseId]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? courseById.isLoading : false,
    courseData: courseById.data?.data,
    currentVisible: courseById.data?.data?.visible,
  };
}
