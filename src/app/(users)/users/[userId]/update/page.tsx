'use client';

import { UserForm } from '@/components/users/UserForm';
import { UserFormValues } from '@/components/users/types';
import { useCreateUser } from '@/hooks/users/useCreateUser';
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { useGetUserByIdQuery } from '@/lib/services/api/usersApi/usersApi';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { data: roles } = useGetAllRolesQuery();
  const { data: typesId } = useGetAllTypeOfIdentificationDocumentQuery();
  const { createUser, isLoading, apiError } = useCreateUser();
  const { data: user } = useGetUserByIdQuery(id);

  const form = useForm<UserFormValues>({
    defaultValues: {
      name: user?.name ?? '',
      lastName: user?.lastName ?? '',
      typeOfIdentificationDocument: user?.typeOfIdentificationDocumentId,
      identificationDocument: user?.identificationDocument ?? '',
      email: '',
      password: '',
      roleId: user?.roleId,
    },
  });

  return (
    <div className="min-h-screen w-full">
      <div className="px-1 pt-10 pb-2">
        <h1 className="text-xl font-normal mb-10">{t('u.userCreation')}</h1>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-md shadow-sm">
        <p className="text-center text-sm py-6 border-b">{t('t.toUpdateAUserCompleteTheFields')}</p>

        <UserForm
          mode="create"
          form={form}
          onSubmit={createUser}
          roles={roles?.data ?? []}
          typesId={typesId?.data ?? []}
          isLoading={isLoading}
          apiError={apiError}
          t={t}
        />
      </div>
    </div>
  );
}
