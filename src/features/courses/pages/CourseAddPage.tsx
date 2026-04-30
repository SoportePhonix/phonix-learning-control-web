'use client';

import { CoursesFormValues } from '@/components/courses/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useCoursesForm } from '@/features/courses/hooks/useCoursesForm';
import { useCreateCourses } from '@/features/courses/hooks/useCreateCourses';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useCompanyNavigation } from '@/hooks/useCompanyNavigation';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

interface CourseAddPageProps {
  baseRoute?: string;
}

export default function CourseAddPage({ baseRoute = '/manage-companies/courses' }: CourseAddPageProps) {
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('c.courses'), path: baseRoute }, { label: t('a.addCourse') }],
    { withLoader: true }
  );
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
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('a.addCourse')} />
      <FormPageLayout description={t('t.toCreateACoursePleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createCourse}
          isLoading={isLoading}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl={companyNav.href(baseRoute)}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
