'use client';

import { use } from 'react';

import { CompaniesFormValues } from '@/components/companies/types';
import { CoursesFormValues } from '@/components/courses/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { useCoursesForm } from '@/features/courses/hooks/useCoursesForm';
import { useUpdateCourse } from '@/features/courses/hooks/useUpdateCourse';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { t } = useTranslation();
  const { data: companiesData, isLoading: companiesLoading, error } = useGetCompaniesQuery();
  const { updateCourse, isLoading, apiError } = useUpdateCourse(courseId);

  const form = useForm<CoursesFormValues>({
    defaultValues: {
      fullName: '',
      shortName: '',
      categoryId: '',
      status: '',
      summary: '',
      startDate: '',
      endDate: '',
      companyId: '',
    },
  });

  const { formConfig, isLoadingData } = useCoursesForm({
    mode: 'edit',
    courseId,
    form,
    companies: companiesData?.data ?? [],
  });

  const handleSubmit = (values: CoursesFormValues) => {
    updateCourse(values);
  };

  return (
    <div className="p-8">
      <SectionTitle title={t('u.updateCourse')} />

      <FormPageLayout description={t('t.toUpdateACourseCompleteTheFields')} isLoading={false}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl="/courses"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
