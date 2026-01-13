'use client';

import { useTranslation } from '@/i18n';
import { useAddCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { AddCompaniesRequest } from '@/lib/services/api/companiesApi/interface';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type FormValues = {
  name: string;
  nit: string;
  email: string;
  status: string;
};

export function useCreateCompanies() {
  const { t } = useTranslation();
  const router = useRouter();
  const [addCompany, { isLoading, error }] = useAddCompaniesMutation();

  const createCompany = async (values: FormValues) => {
    const payload: AddCompaniesRequest = {
      name: values.name,
      nit: values.nit,
      email: values.email,
      status: values.status,
    };

    try {
      await addCompany(payload).unwrap();

      toast.success(`${values.name} ${t('a.addedSuccessfully')}`, {
        id: 'company-created-success',
      });

      router.push('/companies');
    } catch {
      toast.error(t('c.companyCreationFailed'));
    }
  };

  const rawMessage = (error as any)?.data?.message ?? null;
  const statusCode = (error as any)?.status ?? null;

  const isDuplicateNit = typeof rawMessage === 'string' && rawMessage.toLowerCase().includes('duplicate key');

  return {
    createCompany,
    isLoading,

    apiError: statusCode,

    apiErrorMessage: isDuplicateNit ? t('e.existingNit') : rawMessage,
  };
}
