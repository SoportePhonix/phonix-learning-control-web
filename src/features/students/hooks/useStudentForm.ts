import { useEffect, useMemo } from 'react';

import { FormConfig, SelectOption } from '@/components/forms/DynamicForm/types';
import { useTranslation } from '@/i18n';
import { useGetAreasQuery } from '@/lib/services/api/areasApi/areasApi';
import { useGetPositionsQuery } from '@/lib/services/api/positionsApi/positionsApi';
import { useGetStudentByIdQuery } from '@/lib/services/api/studentsApi/studentsApi';
import { useGetAllTypeOfIdentificationDocumentQuery } from '@/lib/services/api/typeOfIdentificationDocumentApi/typeOfIdentificationDocumentApi';
import { useRBAC } from '@/rbac';
import { Session, useSessionContext } from '@/utils/context/sessionContext';
import { UseFormReturn } from 'react-hook-form';

import { userFormConfig } from '../config/studentsFormConfig';

type UseStudentFormProps = {
  mode: 'create' | 'edit';
  studentId?: string;
  form: UseFormReturn<Record<string, any>>;
  companies: any[];
  session?: Session | null;
  companyId?: number | null;
};

export function useStudentForm({ mode, studentId, form, companies, session, companyId }: UseStudentFormProps) {
  const { t } = useTranslation();
  const { hasRole } = useRBAC();
  const { session: contextSession } = useSessionContext();
  const resolvedSession = session ?? contextSession;
  const isSuperadmin = hasRole('superadmin');
  const { data: typesIdData } = useGetAllTypeOfIdentificationDocumentQuery();
  const { data: areasData } = useGetAreasQuery();
  const { data: positionsData } = useGetPositionsQuery();
  const studentById = useGetStudentByIdQuery({ studentId: studentId! }, { skip: mode === 'create' || !studentId });

  const selectedCompanyId = form.watch('companyId');

  const typesIdOptions: SelectOption[] = useMemo(
    () =>
      typesIdData?.data?.map((type: any) => ({
        value: String(type.id),
        label: type.name,
      })) ?? [],
    [typesIdData]
  );

  // Filter companies by session scope for non-superadmin users
  const filteredCompanies = useMemo(() => {
    const activeCompanies = companies?.filter((c) => c.status === 'active') ?? [];
    if (isSuperadmin) return activeCompanies;
    return activeCompanies.filter((c) => resolvedSession?.user?.companies?.some((uc: any) => uc.id === c.id));
  }, [companies, resolvedSession, isSuperadmin]);

  const companiesOptions: SelectOption[] = useMemo(
    () =>
      filteredCompanies.map((company) => ({
        value: String(company.id),
        label: company.name,
      })) ?? [],
    [filteredCompanies]
  );

  const statusOptions: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('a.active') },
      { value: 'inactive', label: t('i.inactive') },
    ],
    [t]
  );

  const areasOptions: SelectOption[] = useMemo(
    () =>
      areasData?.data
        ?.filter(
          (area) => area.status === 'active' && (!selectedCompanyId || String(area.companyId) === selectedCompanyId)
        )
        .map((area) => ({
          value: String(area.id),
          label: area.name,
        })) ?? [],
    [areasData, selectedCompanyId]
  );

  const positionsOptions: SelectOption[] = useMemo(
    () =>
      positionsData?.data
        ?.filter(
          (position) =>
            position.status === 'active' && (!selectedCompanyId || String(position.companyId) === selectedCompanyId)
        )
        .map((position) => ({
          value: String(position.id),
          label: position.name,
        })) ?? [],
    [positionsData, selectedCompanyId]
  );

  const formConfig: FormConfig = useMemo(() => {
    const config = { ...userFormConfig };

    config.fields = config.fields.map((field) => {
      if (field.name === 'status') {
        return { ...field, options: statusOptions };
      }

      if (field.name === 'documentTypeId') {
        return { ...field, options: typesIdOptions };
      }

      if (field.name === 'areaId') {
        return { ...field, options: areasOptions };
      }

      if (field.name === 'positionId') {
        return { ...field, options: positionsOptions };
      }

      return field;
    });

    if (mode === 'create') {
      config.fields = config.fields.filter((field) => field.name !== 'status');
    }

    // Always include companyId field with filtered options
    config.fields = config.fields
      .map((field) => {
        if (field.name === 'companyId') {
          return {
            ...field,
            options: companiesOptions,
          };
        }

        return field;
      })
      .filter((field): field is NonNullable<typeof field> => Boolean(field));

    return config;
  }, [mode, typesIdOptions, companiesOptions, statusOptions, areasOptions, positionsOptions, companyId]);

  useEffect(() => {
    if (mode === 'create' && selectedCompanyId) {
      form.setValue('areaId', '');
      form.setValue('positionId', '');
    }
  }, [selectedCompanyId, form, mode]);

  // Pre-fill companyId when company context is active (create mode)
  useEffect(() => {
    if (mode === 'create' && companyId) {
      form.setValue('companyId', String(companyId), { shouldValidate: true });
    }
  }, [mode, companyId, form]);

  useEffect(() => {
    if (mode === 'edit' && studentById.data?.data && typesIdOptions.length > 0) {
      const studentData = studentById.data.data;

      form.reset(
        {
          firstname: studentData.firstname || '',
          lastname: studentData.lastname || '',
          documentTypeId: studentData.documentType?.id ? String(studentData.documentType?.id) : '',
          documentNumber: studentData.documentNumber || '',
          email: studentData.email || '',
          username: studentData.username || '',
          password: '',
          companyId: studentData.company ? String(studentData.company.id) : '',
          status: studentData.status || '',
          city: studentData.city || '',
          country: studentData.country || '',
          description: studentData.description || '',
          institution: studentData.institution || '',
          department: studentData.department || '',
          phone: studentData.phone || '',
          address: studentData.address || '',
          areaId: studentData.area ? String(studentData.area.id) : '',
          positionId: studentData.position ? String(studentData.position.id) : '',
        },
        { keepDefaultValues: false }
      );
    }
  }, [mode, studentById.data, typesIdOptions, form, studentId]);

  return {
    formConfig,
    isLoadingData: mode === 'edit' ? studentById.isLoading : false,
    userData: studentById.data?.data,
    currentPassword: studentById.data?.data?.password,
    currentStatus: studentById.data?.data?.status,
  };
}
