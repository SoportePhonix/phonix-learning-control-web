import { useTranslation } from '@/i18n';
import { useDeleteCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteCompany() {
  const { t } = useTranslation();
  const router = useRouter();
  const [deleteCompainesMutation, { isLoading, error }] = useDeleteCompaniesMutation();

  const deleteCompany = async (compainesId: number) => {
    try {
      await deleteCompainesMutation({ id: compainesId }).unwrap();
      toast.success(`${t('c.companySuccessfullyRemoved')}`);
      router.refresh();
    } catch (err) {
      toast.error(`${t('t.theCompanyCouldNotBeDeleted')}`);
    }
  };

  return {
    deleteCompany,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
