'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useCreateStudent } from '@/features/students/hooks/useCreateStudent';
import { useStudentForm } from '@/features/students/hooks/useStudentForm';
import { useBreadcrumbs, useCompanyContext, useCompanyNavigation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useRBAC } from '@/rbac';
import { useSessionContext } from '@/utils/context/sessionContext';
import { useForm } from 'react-hook-form';

interface StudentAddPageProps {
  baseRoute?: string;
}

export default function StudentAddPage({ baseRoute = '/manage-companies/students' }: StudentAddPageProps) {
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes } = useBreadcrumbs([{ label: t('s.students'), path: baseRoute }, { label: t('a.addStudent') }], {
    withLoader: true,
  });
  const { data: companiesData } = useGetCompaniesQuery();
  const { session } = useSessionContext();
  const { companyId } = useCompanyContext({ redirectOnMissing: false });
  const { hasRole } = useRBAC();
  const isSuperadmin = hasRole('superadmin');

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
    session,
    companyId,
  });

  // Check if user has permission to create students in the selected company
  // Superadmin: full access
  // Non-superadmin: must have companyId from URL context (backend validates)
  const userHasAccessToCompany = isSuperadmin || !!companyId;
  const showPermissionError = !isSuperadmin && !companyId;

  if (showPermissionError) {
    return (
      <div className="px-2">
        <Breadcrumb items={crumbRoutes} className="mt-2" />
        <PageHeader title={t('a.addStudent')} />
        <FormPageLayout>
          <div className="flex items-center justify-center p-8 text-red-600">
            <p>No tienes permisos para crear estudiantes en esta empresa</p>
          </div>
        </FormPageLayout>
      </div>
    );
  }

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} className="mt-2" />
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
