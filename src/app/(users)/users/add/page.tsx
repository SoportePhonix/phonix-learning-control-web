'use client';

import { UserForm } from '@/components/users/UserForm';
import { UserFormValues } from '@/components/users/types';
import { useCreateUser } from '@/hooks/users/useCreateUser';
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { t } = useTranslation();
  const { data: roles } = useGetAllRolesQuery();
  const { data: typesId } = useGetAllTypeOfIdentificationDocumentQuery();
  const { createUser, isLoading, apiError } = useCreateUser();

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

  return (
    <div className="min-h-screen w-full">
      <div className="px-1 pt-10 pb-2">
        <h1 className="text-xl font-normal mb-10">{t('u.userCreation')}</h1>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-md shadow-sm">
        <p className="text-center text-sm py-6 border-b">{t('t.toCreateAUserPleaseFillInTheFields')}</p>

        <UserForm
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
