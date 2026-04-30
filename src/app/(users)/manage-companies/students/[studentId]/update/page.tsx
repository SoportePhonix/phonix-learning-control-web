'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useStudentForm } from '@/features/students/hooks/useStudentForm';
import { useUpdateStudent } from '@/features/students/hooks/useUpdateStudent';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useCompanyNavigation } from '@/hooks/useCompanyNavigation';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = use(params);
  const { t } = useTranslation();
  const companyNav = useCompanyNavigation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('s.students'), path: companyNav.href('/manage-companies/students') }, { label: t('u.updateStudent') }],
    { withLoader: true }
  );
  const { data: companiesData, isLoading: companiesLoading, error: companiesError } = useGetCompaniesQuery();
  const { updateStudent, isLoading, apiError } = useUpdateStudent(studentId);

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
      status: '',
      companyId: '',
      areaId: '',
      positionId: '',
    },
  });

  const { formConfig, isLoadingData } = useStudentForm({
    mode: 'edit',
    studentId,
    form,
    companies: companiesData?.data ?? [],
  });

  const handleSubmit = (values: Record<string, any>) => {
    updateStudent(values);
  };

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('u.updateStudent')} />
      <FormPageLayout description={t('t.toUpdateAStudentCompleteTheFields' as any)} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl={companyNav.href('/manage-companies/students')}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
