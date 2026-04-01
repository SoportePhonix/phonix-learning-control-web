'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { PageHeader } from '@/components/page-header';
import { UserFormValues } from '@/components/users/types';
import { useUpdateUser } from '@/features/users/hooks/useUpdateUser';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useTranslation } from '@/i18n';
import { Breadcrumb } from '@/lib/phonix-ui';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const { t } = useTranslation();
  const { crumbRoutes, isNavigating } = useBreadcrumbs(
    [{ label: t('u.users'), path: '/users' }, { label: t('u.updateUser') }],
    { withLoader: true }
  );
  const { data: companiesData, isLoading: companiesLoading, error } = useGetCompaniesQuery();
  const { updateUser, isLoading, apiError } = useUpdateUser(userId);

  const form = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      lastName: '',
      typeOfIdentificationDocument: '',
      identificationDocument: '',
      email: '',
      password: '',
      roleId: '',
      companyId: '',
      status: '',
    },
  });

  const { formConfig, isLoadingData, userData, currentPassword } = useUserForm({
    mode: 'edit',
    userId,
    form,
    companies: companiesData?.data ?? [],
  });

  // Función wrapper para manejar la contraseña de forma transparente
  const handleSubmit = (values: UserFormValues) => {
    const submitValues = {
      ...values,
      // Si no se ingresó una nueva contraseña, usar la actual
      password: values.password || currentPassword || '',
    };
    updateUser(submitValues);
  };

  return (
    <div className="px-2">
      <Breadcrumb items={crumbRoutes} />
      <PageHeader title={`${t('u.updateUser')}`} />
      <FormPageLayout description={t('t.toUpdateAUserCompleteTheFields')} isLoading={isLoadingData}>
        <DynamicForm
          config={formConfig}
          mode="edit"
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
          cancelUrl="/users"
          t={t}
        />
      </FormPageLayout>
    </div>
  );
}
