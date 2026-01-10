'use client';

import { useEffect } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { UserFormValues } from '@/components/users/types';
import { useCreateUser } from '@/features/users/hooks/useCreateUser';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { data: companiesData, isLoading: companiesLoading, error } = useGetCompaniesQuery();
  const { createUser, isLoading: isCreatingUser, apiError } = useCreateUser();

  const form = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      lastName: '',
      typeOfIdentificationDocument: '',
      identificationDocument: '',
      password: '',
      email: '',
      roleId: '',
      companyId: '',
    },
  });

  const { formConfig } = useUserForm({
    mode: 'create',
    form,
    companies: companiesData?.data ?? [],
  });

  return (
    <div className="p-8">
      <SectionTitle title={t('a.addUser')} />
      <FormPageLayout description={t('t.toCreateAUserPleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createUser}
          isLoading={isCreatingUser}
          apiError={apiError}
          cancelUrl="/users"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
