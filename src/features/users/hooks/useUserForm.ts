import { useEffect, useMemo } from 'react';

import { FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { UserFormValues } from '@/components/users/types';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { useGetUserByIdQuery } from '@/lib/services/api/usersApi/usersApi';
import { UseFormReturn } from 'react-hook-form';

import { userFormConfig } from '../config/usersFormConfig';

type UseUserFormProps = {
  mode: 'create' | 'edit';
  userId?: string;
  form: UseFormReturn<UserFormValues>;
};

export function useUserForm({ mode, userId, form }: UseUserFormProps) {
  // Queries
  const { data: rolesData } = useGetAllRolesQuery();
  const { data: typesIdData } = useGetAllTypeOfIdentificationDocumentQuery();
  const userById = useGetUserByIdQuery(
    { userId: userId! },
    {
      skip: mode === 'create' || !userId,
    }
  );

  const rolesOptions: SelectOption[] = useMemo(() => {
    return (
      rolesData?.data?.map((role: any) => ({
        value: String(role.id),
        label: role.name,
      })) ?? []
    );
  }, [rolesData]);

  const typesIdOptions: SelectOption[] = useMemo(() => {
    return (
      typesIdData?.data?.map((type: any) => ({
        value: String(type.id),
        label: type.name,
      })) ?? []
    );
  }, [typesIdData]);

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...userFormConfig };
    config.fields = config.fields.map((field) => {
      if (field.name === 'typeOfIdentificationDocument') {
        return { ...field, options: typesIdOptions };
      }
      if (field.name === 'roleId') {
        return { ...field, options: rolesOptions };
      }
      return field;
    });
    return config;
  }, [rolesOptions, typesIdOptions]);

  useEffect(() => {
    if (mode === 'edit' && userById.data?.data && typesIdOptions.length > 0 && rolesOptions.length > 0) {
      const userData = userById.data.data;

      const formData = {
        name: userData.name || '',
        lastName: userData.lastName || '',
        typeOfIdentificationDocument: userData.typeOfIdentificationDocument?.id
          ? String(userData.typeOfIdentificationDocument.id)
          : '',
        identificationDocument: userData.identificationDocument || '',
        email: userData.email || '',
        password: '',
        roleId: userData.role?.[0]?.id ? String(userData.role[0].id) : '',
      };

      form.reset(formData, { keepDefaultValues: false });
    }
  }, [mode, userById.data, typesIdOptions, rolesOptions, form, userId]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? userById.isLoading : false,
    userData: userById.data?.data,
    currentPassword: userById.data?.data?.password,
  };
}
