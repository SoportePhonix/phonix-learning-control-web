'use client';

import { useState } from 'react';

import { useTranslation } from '@/i18n';
import { AddUserRequest } from '@/lib/services/api/usersApi/interface';
import { useAddUsersMutation } from '@/lib/services/api/usersApi/usersApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type FormValues = {
  name: string;
  lastName: string;
  typeOfIdentificationDocument: string;
  identificationDocument: string;
  email: string;
  password: string;
  roleId: string;
};

export function useCreateUser() {
  const { t } = useTranslation();
  const router = useRouter();
  const [apiError, setApiError] = useState<number | null>(null);

  const [addUser, { isLoading, isError, isSuccess, status, error }] = useAddUsersMutation();

  const createUser = async (values: FormValues) => {
    const payload: AddUserRequest = {
      name: values.name,
      lastName: values.lastName,
      typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
      identificationDocument: values.identificationDocument,
      email: values.email,
      password: values.password,
      role: [{ id: Number(values.roleId) }],
    };

    setApiError(null);

    try {
      await addUser(payload).unwrap();
      toast.success(` ${values.name} ${values.lastName} ${t('u.addedSuccessfully')} `, {
        id: 'user-created-success',
      });
      router.push('/users');
    } catch (err: any) {
      const status = err?.status ?? 500;
      setApiError(status);
      toast.error(t('u.userCreationFailed'));
    }
  };

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
    status,
    error,
    apiError,
    setApiError,
  };
}
