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

  // Cargar los datos del usuario en el formulario cuando estén disponibles
  useEffect(() => {
    if (userById.data?.data) {
      const userData = userById.data.data;

      form.reset({
        name: userData.name || '',
        lastName: userData.lastName || '',
        typeOfIdentificationDocument: userData.typeOfIdentificationDocument?.id
          ? String(userData.typeOfIdentificationDocument.id)
          : undefined,
        identificationDocument: userData.identificationDocument || '',
        email: userData.email || '',
        password: '', // La contraseña siempre vacía por seguridad
        roleId: userData.role?.[0]?.id ? String(userData.role[0].id) : undefined,
      });
    }
  }, [userById.data, form]);

  return (
    <>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">
          {t('u.updateUser')}: {userById.data?.data.name || ''}
        </h1>
        <UserForm
          mode="edit"
          form={form}
          roles={roles?.data?.data ?? []}
          typesId={typeOfDocument?.data?.data ?? []}
          onSubmit={updateUser}
          isLoading={userById?.isLoading || isLoading}
          apiError={apiError}
          t={t}
        />
      </div>
    </>
  );
}
