import { useDeleteCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteCompany() {
  const router = useRouter();
  const [deleteCompainesMutation, { isLoading, error }] = useDeleteCompaniesMutation();

  const deleteCompany = async (compainesId: number) => {
    try {
      await deleteCompainesMutation({ id: compainesId }).unwrap();
      toast.success('Usuario eliminado correctamente');
      router.refresh(); // 👈 FORZAMOS REFRESH
    } catch (err) {
      toast.error('No se pudo eliminar el usuario');
    }
  };

  return {
    deleteCompany,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
