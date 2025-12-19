'use client';

import { DynamicForm } from '@/components/forms/DynamicForm';
import { FormPageLayout } from '@/components/forms/FormPageLayout';
import { UserFormValues } from '@/components/users/types';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { useCreateUser } from '@/hooks/users/useCreateUser';
import { useTranslation } from '@/i18n';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { createUser, isLoading, apiError } = useCreateUser();

  const form = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      lastName: '',
      typeOfIdentificationDocument: '',
      identificationDocument: '',
      password: '',
      email: '',
      roleId: '',
    },
  });

  const { formConfig } = useUserForm({
    mode: 'create',
    form,
  });

  return (
    <FormPageLayout title={t('u.userCreation')} description={t('t.toCreateAUserPleaseFillInTheFields')}>
      <DynamicForm
        config={formConfig}
        mode="create"
        form={form}
        onSubmit={createUser}
        isLoading={isLoading}
        apiError={apiError}
        cancelUrl="/users"
        t={t}
      />
    </FormPageLayout>
  );
}
