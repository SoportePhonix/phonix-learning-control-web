'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { useStudentForm } from '@/features/students/hooks/useStudentForm';
import { useUpdateStudent } from '@/features/students/hooks/useUpdateStudent';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = use(params);
  const { t } = useTranslation();
  const { data: companiesData, isLoading: companiesLoading, error: companiesError } = useGetCompaniesQuery();
  const { updateStudent, isLoading, apiError } = useUpdateStudent(studentId);

  const form = useForm<Record<string, any>>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      typeOfIdentificationDocument: '',
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
    <div className="p-8">
      <SectionTitle title={t('s.students')} />
      <FormPageLayout description={t('t.toUpdateACourseCompleteTheFields' as any)} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl="/students"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
