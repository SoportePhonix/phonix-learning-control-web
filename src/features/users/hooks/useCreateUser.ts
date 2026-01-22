'use client';

import { useState } from 'react';

import { UserFormValues } from '@/components/users/types';
import { TranslationKey, useTranslation } from '@/i18n';
import { AddUserRequest } from '@/lib/services/api/usersApi/interface';
import { useAddUsersMutation } from '@/lib/services/api/usersApi/usersApi';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

export function useCreateUser(form: UseFormReturn<UserFormValues>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [addUser, { isLoading }] = useAddUsersMutation();

  const [apiError, setApiError] = useState<number | null>(null);
  const [apiErrorMessage, setApiErrorMessage] = useState<TranslationKey | undefined>(undefined);

  const createUser = async (values: UserFormValues) => {
    try {
      setApiError(null);
      setApiErrorMessage(undefined);
      form.clearErrors();

      const payload: AddUserRequest = {
        name: values.name,
        lastName: values.lastName,
        typeOfIdentificationDocument: Number(values.typeOfIdentificationDocument),
        identificationDocument: values.identificationDocument,
        email: values.email,
        password: values.password,
        role: [{ id: Number(values.roleId) }],
        ...(values.companyId && { companyId: Number(values.companyId) }),
        status: 'active',
      };

      await addUser(payload).unwrap();

      toast.success(`${values.name} ${values.lastName} ${t('a.addedSuccessfully')}`);

      router.push('/users');
    } catch (err: any) {
      const status = err?.status ?? 500;
      const errorMessage = err?.data?.message || '';

      // 409 → errores de campo
      if (status === 409) {
        if (errorMessage.toLowerCase().includes('email')) {
          form.setError('email', {
            type: 'manual',
            message: t('e.existingEmail'),
          });
          return;
        }

        if (
          errorMessage.toLowerCase().includes('user already exists') ||
          errorMessage.toLowerCase().includes('identification') ||
          errorMessage.toLowerCase().includes('document')
        ) {
          form.setError('identificationDocument', {
            type: 'manual',
            message: t('e.existingIdentificationDocument'),
          });
          return;
        }
      }

      if (status === 500) {
        toast.error(t('u.unexpectedErrorIfTheErrorPersistsContactTheAdministrator'));
        return;
      }

      setApiError(status);
      setApiErrorMessage('u.userCreationFailed');
    }
  };

  return {
    createUser,
    isLoading,
    apiError,
    apiErrorMessage,
  };
}
