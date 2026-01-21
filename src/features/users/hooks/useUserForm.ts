import { useEffect, useMemo } from 'react';

import { FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { UserFormValues } from '@/components/users/types';
import { useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { useGetUserByIdQuery } from '@/lib/services/api/usersApi/usersApi';
import { UseFormReturn } from 'react-hook-form';

import { userFormConfig } from '../config/usersFormConfig';

type UseUserFormProps = {
  mode: 'create' | 'edit';
  userId?: string;
  form: UseFormReturn<UserFormValues>;
  companies: any[];
};

export function useUserForm({ mode, userId, form, companies }: UseUserFormProps) {
  const { t } = useTranslation();
  const { data: rolesData } = useGetAllRolesQuery();
  const { data: typesIdData } = useGetAllTypeOfIdentificationDocumentQuery();
  const userById = useGetUserByIdQuery({ userId: userId! }, { skip: mode === 'create' || !userId });

  const selectedRoleId = form.watch('roleId');

  const adminRoleId = rolesData?.data?.find((r: any) => r.name === 'Administrator')?.id;
  const managerRoleId = rolesData?.data?.find((r: any) => r.name === 'Manager')?.id;

  const rolesOptions: SelectOption[] = useMemo(
    () =>
      rolesData?.data?.map((role: any) => ({
        value: String(role.id),
        label: role.name,
      })) ?? [],
    [rolesData]
  );

  const typesIdOptions: SelectOption[] = useMemo(
    () =>
      typesIdData?.data?.map((type: any) => ({
        value: String(type.id),
        label: type.name,
      })) ?? [],
    [typesIdData]
  );

  const companiesOptions: SelectOption[] = useMemo(
    () =>
      companies
        ?.filter((company) => company.status === 'active')
        .map((company) => ({
          value: String(company.id),
          label: company.name,
        })) ?? [],
    [companies]
  );

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    []
  );

  const formConfig: FormConfig = useMemo(() => {
    const isAdmin = !!adminRoleId && String(adminRoleId) === selectedRoleId;
    const isManager = !!managerRoleId && String(managerRoleId) === selectedRoleId;

    const shouldShowCompany = !!selectedRoleId && !isAdmin;

    const config = { ...userFormConfig };

    config.fields = config.fields.map((field) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }
      return field;
    });

    config.fields = config.fields
      .map((field) => {
        if (field.name === 'typeOfIdentificationDocument') {
          return { ...field, options: typesIdOptions };
        }

        if (field.name === 'roleId') {
          return { ...field, options: rolesOptions };
        }

        if (field.name === 'companyId') {
          if (!shouldShowCompany) return null;

          return {
            ...field,
            options: companiesOptions,
            required: isManager,
          };
        }

        return field;
      })
      .filter((field): field is NonNullable<typeof field> => Boolean(field));

    return config;
  }, [rolesOptions, typesIdOptions, companiesOptions, selectedRoleId, adminRoleId, managerRoleId, statusOptions]);

  useEffect(() => {
    const isAdmin = !!adminRoleId && String(adminRoleId) === selectedRoleId;

    if (isAdmin) {
      form.setValue('companyId', '');
    }
  }, [selectedRoleId, adminRoleId, form]);

  useEffect(() => {
    if (mode === 'edit' && userById.data?.data && typesIdOptions.length > 0 && rolesOptions.length > 0) {
      const userData = userById.data.data;

      form.reset(
        {
          name: userData.name || '',
          lastName: userData.lastName || '',
          typeOfIdentificationDocument: userData.typeOfIdentificationDocument?.id
            ? String(userData.typeOfIdentificationDocument.id)
            : '',
          identificationDocument: userData.identificationDocument || '',
          email: userData.email || '',
          password: '',
          roleId: userData.role?.[0]?.id ? String(userData.role[0].id) : '',
          companyId: userData.companies?.[0]?.id ? String(userData.companies[0]?.id) : '',
          status: userData.status || '',
        },
        { keepDefaultValues: false }
      );
    }
  }, [mode, userById.data, typesIdOptions, rolesOptions, form, userId]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? userById.isLoading : false,
    userData: userById.data?.data,
    currentPassword: userById.data?.data?.password,
    currentStatus: userById.data?.data?.status,
  };
}
