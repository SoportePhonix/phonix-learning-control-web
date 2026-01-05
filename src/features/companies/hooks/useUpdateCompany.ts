import { CompaniesFormValues } from '@/components/companies/types';
import { useTranslation } from '@/i18n';
import { useUpdateCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useUpdateCompany(companyId: string) {
  const { t } = useTranslation();
  const router = useRouter();

  const [updateCompaniesMutation, { isLoading, error }] = useUpdateCompaniesMutation();

  const updateCompanies = async (values: CompaniesFormValues) => {
    const payload = {
      name: values.name,
      nit: values.nit,
      email: values.email,
      status: values.status ?? 'active',

      // agrega aquí solo lo que el backend espera
    };

    try {
      await updateCompaniesMutation({
        id: Number(companyId),
        ...payload,
      }).unwrap();

      toast.success(t('c.companyUpdatedSuccessfully'), {
        id: 'company-updated-success',
      });

      router.push('/companies');
    } catch {
      toast.error(t('c.companyUpdateFailed'), {
        id: 'company-updated-error',
      });
    }
  };

  return {
    updateCompanies,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
