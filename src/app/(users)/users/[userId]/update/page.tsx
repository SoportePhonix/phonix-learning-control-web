'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { UserFormValues } from '@/components/users/types';
import { useUpdateUser } from '@/features/users/hooks/useUpdateUser';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { useTranslation } from '@/i18n';
import { useGetCompaniesQuery } from '@/lib/services/api/companiesApi/companiesApi';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const { t } = useTranslation();
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
    <div className="p-8">
      <SectionTitle title={`${t('u.updateUser')}`} />
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
