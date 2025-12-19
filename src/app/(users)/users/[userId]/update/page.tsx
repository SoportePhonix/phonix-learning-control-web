'use client';

import { use } from 'react';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
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

  const { formConfig, isLoadingData, userData } = useUserForm({
    mode: 'edit',
    userId,
    form,
  });

  return (
    <FormPageLayout
      title={`${t('u.updateUser')}: ${userData?.name || ''}`}
      description={t('t.toUpdateAUserCompleteTheFields')}
      isLoading={isLoadingData}
    >
      <DynamicForm
        config={formConfig}
        mode="edit"
        form={form}
        onSubmit={updateUser}
        isLoading={isLoading}
        apiError={apiError}
        cancelUrl="/users"
        t={t}
      />
    </FormPageLayout>
  );
}
