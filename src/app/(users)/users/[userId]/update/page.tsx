'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { SectionTitle } from '@/components/section-title';
import { UserFormValues } from '@/components/users/types';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { useUpdateUser } from '@/hooks/users/useUpdateUser';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const { t } = useTranslation();

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
    },
  });

  const { formConfig, isLoadingData, userData, currentPassword } = useUserForm({
    mode: 'edit',
    userId,
    form,
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
    <>
      <SectionTitle title={`${t('u.updateUser')}: ${userData?.name || ''}`} />
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
    </>
  );
}
