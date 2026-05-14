'use client';

import { use } from 'react';

import { CoursesFormValues } from '@/components/courses/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useCoursesForm } from '@/features/courses/hooks/useCoursesForm';
import { useUpdateCourse } from '@/features/courses/hooks/useUpdateCourse';
import { useBreadcrumbs, useCompanyNavigation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('c.courses'), path: companyNav.href('/manage-companies/courses') }, { label: t('u.updateCourse') }],
    { withLoader: true }
  );
  const { data: companiesData, isLoading: companiesLoading, error } = useGetCompaniesQuery();
  const { updateCourse, isLoading, apiError } = useUpdateCourse(courseId);

  const form = useForm<CoursesFormValues>({
    defaultValues: {
      fullName: '',
      shortName: '',
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
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} className="mt-2" />
      <PageHeader title={t('u.updateCourse')} />

      <FormPageLayout description={t('t.toUpdateACourseCompleteTheFields')} isLoading={false}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl={companyNav.href('/manage-companies/courses')}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
