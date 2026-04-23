import { useEffect, useMemo } from 'react';

import { FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { UserFormValues } from '@/components/users/types';
import { useGetInstancesSelect } from '@/features/adminInstance/hooks/useGetInstancesSelect';
import { TranslationKey, useTranslation } from '@/i18n';
import { useGetAllRolesQuery } from '@/lib/services/api/rolesApi/rolesApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { useGetUserByIdQuery } from '@/lib/services/api/usersApi/usersApi';
import { Role, canAssignRole, normalizeRoleName } from '@/rbac/config/roles';
import { useSessionContext } from '@/utils/context/sessionContext';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

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

  const { session } = useSessionContext();
  const currentInstanceId = session?.user?.instanceId || (session?.user as any)?.instance?.id;
  const instanceName = 'Instancia actual'; // Puedes ajustarlo si viene en session
  const isInstanceLoading = false; // Ya no dependemos de un hook que carga

  const { data: instancesOptions } = useGetInstancesSelect();

  const selectedRoleId = form.watch('roleId');

  const superAdminRoleId = rolesData?.data?.find((r: any) => normalizeRoleName(r.name) === Role.SUPERADMIN)?.id;
  const adminRoleId = rolesData?.data?.find((r: any) => normalizeRoleName(r.name) === Role.ADMIN)?.id;
  const managerRoleId = rolesData?.data?.find((r: any) => normalizeRoleName(r.name) === Role.MANAGER)?.id;

  const rolesOptions: SelectOption[] = useMemo(() => {
    if (!rolesData?.data) return [];
    const currentRoles = session?.user?.role || [];
    return rolesData.data
      .filter((role: any) => canAssignRole(currentRoles, role.name))
      .map((role: any) => ({
        value: String(role.id),
        label: role.name,
      }));
  }, [rolesData?.data, session?.user?.role]);

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
    const isSuperAdminSelection = !!superAdminRoleId && String(superAdminRoleId) === selectedRoleId;
    const isAdminSelection = !!adminRoleId && String(adminRoleId) === selectedRoleId;
    const isManagerSelection = !!managerRoleId && String(managerRoleId) === selectedRoleId;

    const shouldShowCompany = !!selectedRoleId && !isAdminSelection && !isSuperAdminSelection;

    const config = { ...userFormConfig };

    config.fields = config.fields.map((field) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }

      if (field.name === 'typeOfIdentificationDocument') {
        return { ...field, options: typesIdOptions };
      }

      if (field.name === 'roleId') {
        return { ...field, options: rolesOptions };
      }

      return field;
    });

    if (mode === 'create') {
      config.fields = config.fields.filter((field) => field.name !== 'status');
    }

    config.fields = config.fields
      .map((field) => {
        if (field.name === 'companyId') {
          if (!shouldShowCompany) return null;

          return {
            ...field,
            options: companiesOptions,
            required: isManagerSelection,
          };
        }

        if (field.name === 'instanceId') {
          if (!isAdminSelection) return null;

          if (currentInstanceId) {
            return null; // 🔥 ADMIN → NO VE SELECT
          }

          return {
            ...field,
            options: instancesOptions,
            required: true,
          };
        }

        return field;
      })
      .filter((field): field is NonNullable<typeof field> => Boolean(field));

    return config;
  }, [
    mode,
    rolesOptions,
    typesIdOptions,
    companiesOptions,
    instancesOptions,
    selectedRoleId,
    superAdminRoleId,
    adminRoleId,
    managerRoleId,
    statusOptions,
    currentInstanceId,
    instanceName,
  ]);

  useEffect(() => {
    const isSuperAdminSelection = !!superAdminRoleId && String(superAdminRoleId) === selectedRoleId;
    const isAdminSelection = !!adminRoleId && String(adminRoleId) === selectedRoleId;
    const isManagerSelection = !!managerRoleId && String(managerRoleId) === selectedRoleId;

    if (isAdminSelection || isSuperAdminSelection) {
      if (isAdminSelection && !currentInstanceId && instancesOptions.length === 0) {
        toast.error('Debes crear una instancia antes de crear un administrador');
      }
      form.setValue('companyId', '');
      form.clearErrors('companyId');

      if (isSuperAdminSelection) {
        form.setValue('instanceId', '');
        form.clearErrors('instanceId');
      }

      if (isAdminSelection && currentInstanceId && mode === 'create') {
        form.setValue('instanceId', String(currentInstanceId));
      }
    }

    if (!isAdminSelection && !isSuperAdminSelection) {
      form.setValue('instanceId', '');
      form.clearErrors('instanceId');
    }
  }, [
    selectedRoleId,
    superAdminRoleId,
    adminRoleId,
    managerRoleId,
    form,
    currentInstanceId,
    mode,
    instancesOptions.length,
  ]);

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
    isLoadingData: (mode === 'edit' ? userById.isLoading : false) || isInstanceLoading,
    userData: userById.data?.data,
    currentPassword: userById.data?.data?.password,
    currentStatus: userById.data?.data?.status,
  };
}
