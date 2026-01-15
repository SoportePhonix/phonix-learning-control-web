'use client';

import { CoursesForm } from '@/components/courses/CoursesForm';
import { CoursesFormValues } from '@/components/courses/types';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { useCreateCourses } from '@/features/courses/hooks/useCreateCourses';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { createCourses, isLoading, apiError, apiErrorMessage } = useCreateCourses();

  const form = useForm<CoursesFormValues>({
    defaultValues: {
      fullName: '',
      shortName: '',
      categoryId: undefined,
      summary: '',
      visible: 1,
      startDate: undefined,
      endDate: undefined,
    },
  });

  return (
    <div className="p-8">
      <SectionTitle title={t('a.addCourse')} />

      <FormPageLayout description={t('t.toCreateACoursePleaseFillInTheFields')}>
        <CoursesForm
          mode="create"
          form={form}
          onSubmit={createCourses}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
