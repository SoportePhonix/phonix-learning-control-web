'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useCompanyNavigation } from '@/features/students/hooks/useCompanyNavigation';
import { useCreateStudent } from '@/features/students/hooks/useCreateStudent';
import { useStudentForm } from '@/features/students/hooks/useStudentForm';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

interface StudentAddPageProps {
  baseRoute?: string;
}

export default function StudentAddPage({ baseRoute = '/manage-companies/students' }: StudentAddPageProps) {
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('s.students'), path: baseRoute }, { label: t('a.addStudent') }],
    { withLoader: true }
  );
  const { data: companiesData } = useGetCompaniesQuery();

  const form = useForm<Record<string, any>>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      documentTypeId: '',
      documentNumber: '',
      description: '',
      city: '',
      country: '',
      institution: '',
      department: '',
      phone: '',
      address: '',
      companyId: '',
      areaId: '',
      positionId: '',
    },
  });

  const { createStudent, isLoading, apiError, apiErrorMessage } = useCreateStudent(form);

  const { formConfig } = useStudentForm({
    mode: 'create',
    studentId: undefined,
    form,
    companies: companiesData?.data ?? [],
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('a.addStudent')} />
      <FormPageLayout description={t('t.toCreateAStudentPleaseFillInTheFields' as any)}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createStudent}
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
