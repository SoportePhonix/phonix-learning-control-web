'use client';

import { CoursesFormValues } from '@/components/courses/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { useCoursesForm } from '@/features/courses/hooks/useCoursesForm';
import { useCreateCourses } from '@/features/courses/hooks/useCreateCourses';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

interface CourseAddPageProps {
  baseRoute?: string;
}

export default function CourseAddPage({ baseRoute = '/manage-companies/courses' }: CourseAddPageProps) {
  const { t } = useTranslation();
  const { data: companiesData } = useGetCompaniesQuery();

  const form = useForm<CoursesFormValues>({
    defaultValues: {
      fullName: '',
      shortName: '',
      summary: '',
      status: '',
      startDate: '',
      endDate: '',
      companyId: '',
    },
  });

  const { createCourse, isLoading, apiError, apiErrorMessage } = useCreateCourses(form);

  const { formConfig } = useCoursesForm({
    mode: 'create',
    form,
    companies: companiesData?.data ?? [],
  });

  return (
    <div className="p-8">
      <SectionTitle title={t('a.addCourse')} />
      <FormPageLayout description={t('t.toCreateACoursePleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createCourse}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl={baseRoute}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
