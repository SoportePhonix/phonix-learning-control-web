'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { useCreateStudent } from '@/features/students/hooks/useCreateStudent';
import { useStudentForm } from '@/features/students/hooks/useStudentForm';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

interface StudentAddPageProps {
  baseRoute?: string;
}

export default function StudentAddPage({ baseRoute = '/manage-companies/students' }: StudentAddPageProps) {
  const { t } = useTranslation();
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
    <div className="p-8">
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
          cancelUrl={baseRoute}
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
