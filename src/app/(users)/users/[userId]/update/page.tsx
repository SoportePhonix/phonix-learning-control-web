'use client';

import { use, useEffect } from 'react';

import { UserForm } from '@/components/users/UserForm';
import { UserFormValues } from '@/components/users/types';
import { useUpdateUser } from '@/hooks/users/useUpdateUser';
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { useGetUserByIdQuery } from '@/lib/services/api/usersApi/usersApi';
import { useForm } from 'react-hook-form';

export default function Page({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const { t } = useTranslation();

  const userById = useGetUserByIdQuery({ userId });
  const roles = useGetAllRolesQuery();
  const typeOfDocument = useGetAllTypeOfIdentificationDocumentQuery();

  const { updateUser, isLoading, apiError } = useUpdateUser(userId);

  console.log({ userById, roles, typeOfDocument });

  const form = useForm<UserFormValues>({
    defaultValues: {
      name: '',
      lastName: '',
      typeOfIdentificationDocument: undefined,
      identificationDocument: '',
      email: '',
      password: '',
      roleId: undefined,
    },
  });

  return (
    <>
      <div>Actualizar Usuario {userById.data?.data.name}</div>;
      <UserForm
        mode="edit"
        form={form}
        roles={roles?.data?.data ?? []}
        typesId={typeOfDocument?.data?.data ?? []}
        onSubmit={updateUser}
        isLoading={userById?.isLoading}
        apiError={userById?.error as any}
        t={t}
      />
    </>
  );
}
