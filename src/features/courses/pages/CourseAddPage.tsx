'use client';

import { CoursesFormValues } from '@/components/courses/types';
import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useCoursesForm } from '@/features/courses/hooks/useCoursesForm';
import { useCreateCourses } from '@/features/courses/hooks/useCreateCourses';
import { useBreadcrumbs, useCompanyNavigation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface CourseAddPageProps {
  baseRoute?: string;
}

export default function CourseAddPage({ baseRoute = '/manage-companies/courses' }: CourseAddPageProps) {
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes } = useBreadcrumbs([{ label: t('c.courses'), path: baseRoute }, { label: t('a.addCourse') }], {
    withLoader: true,
  });

  const searchParams = useSearchParams();
  const companyIdFromUrl = searchParams.get('companyId');
  const companyId = companyIdFromUrl ? parseInt(companyIdFromUrl, 10) : null;

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
    companyId,
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} className="mt-2" />
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
