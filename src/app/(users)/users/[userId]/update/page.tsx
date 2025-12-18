'use client';

import { useEffect } from 'react';

import { UserForm } from '@/components/users/UserForm';
import { UserFormValues } from '@/components/users/types';

/* import { useUpdateUser } from '@/hooks/users/useUpdateUser'; */
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { useGetUserByIdQuery } from '@/lib/services/api/usersApi/usersApi';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

/*export default function Page() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const { data: roles } = useGetAllRolesQuery();
  const { data: typesId } = useGetAllTypeOfIdentificationDocumentQuery();
  const { data: user } = useGetUserByIdQuery(id);

  const { updateUser, isLoading, apiError } = useUpdateUser(id);

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

  // 🔑 Cargar datos cuando llega el usuario
  useEffect(() => {
    if (!user) return;

    form.reset({
      name: user.name,
      lastName: user.lastName,
      typeOfIdentificationDocument: user.typeOfIdentificationDocumentId,
      identificationDocument: user.identificationDocument,
      email: user.email,
      password: '',
      roleId: user.roleId,
    });
  }, [user, form]);

  return (
    <div className="min-h-screen w-full">
      <div className="px-1 pt-10 pb-2">
        <h1 className="text-xl font-normal mb-10">
          {t('u.userUpdate')}
        </h1>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-md shadow-sm">
        <p className="text-center text-sm py-6 border-b">
          {t('t.toUpdateAUserCompleteTheFields')}
        </p>

        <UserForm
          mode="edit"
          form={form}
          onSubmit={updateUser}
          roles={roles?.data ?? []}
          typesId={typesId?.data ?? []}
          isLoading={isLoading}
          apiError={apiError}
          t={t}
        />
      </div>
    </div>
  );
}*/

export default function Page() {}
