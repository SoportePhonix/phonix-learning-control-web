'use client';

import { CompaniesFormValues } from '@/components/companies/types';
import { useTranslation } from '@/i18n';
import { useAddCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { AddCompaniesRequest } from '@/lib/services/api/companiesApi/interface';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useCreateCompanies() {
  const { t } = useTranslation();
  const router = useRouter();
  const [addCompany, { isLoading, error }] = useAddCompaniesMutation();

  const createCompany = async (values: CompaniesFormValues) => {
    const payload: AddCompaniesRequest = {
      name: values.name,
      nit: values.nit,
      email: values.email,
      status: values.status!, // ✅ asegurado por validación del form
    };

    try {
      await addCompany(payload).unwrap();

      toast.success(`${values.name} ${t('a.addedSuccessfully')}`, {
        id: 'company-created-success',
      });

      router.push('/companies');
    } catch {
      // ⚠️ El backend devuelve 500 incluso para errores de validación
      toast.error(t('c.companyCreationFailed'));
    }
  };

  const rawMessage = (error as any)?.data?.message ?? null;
  const statusCode = (error as any)?.status ?? null;

  const isDuplicateNit = typeof rawMessage === 'string' && rawMessage.toLowerCase().includes('duplicate key');

  return {
    createCompany,
    isLoading,

    // status real que llega del backend (aunque esté mal)
    apiError: statusCode,

    // mensaje listo para UI (NO técnico)
    apiErrorMessage: isDuplicateNit ? 'El NIT ya existe' : rawMessage,
  };
}
