'use client';

import { useEffect } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { UserFormValues } from '@/components/users/types';
import { useCreateUser } from '@/features/users/hooks/useCreateUser';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { useBreadcrumbs } from '@/hooks';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('u.users'), path: '/users' }, { label: t('a.addUser') }],
    { withLoader: true }
  );

  const { data: companiesData, isLoading: companiesLoading, error } = useGetCompaniesQuery();

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

  const { createUser, isLoading: isCreatingUser, apiError, apiErrorMessage } = useCreateUser(form);

  const { formConfig } = useUserForm({
    mode: 'create',
    form,
    companies: companiesData?.data ?? [],
  });

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={t('a.addUser')} />
      <FormPageLayout description={t('t.toCreateAUserPleaseFillInTheFields')}>
        <DynamicForm
          config={formConfig}
          mode="create"
          form={form}
          onSubmit={createUser}
          isLoading={isCreatingUser}
          apiError={apiError}
          apiErrorMessage={apiErrorMessage}
          cancelUrl="/users"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
