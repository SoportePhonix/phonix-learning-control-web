import { useDeleteUserMutation } from '@/lib/services/api/usersApi/usersApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteUser() {
  const router = useRouter();
  const [deleteUserMutation, { isLoading, error }] = useDeleteUserMutation();

  const deleteUser = async (userId: number) => {
    try {
      await deleteUserMutation({ id: userId }).unwrap();

      toast.success('Usuario eliminado correctamente');
      router.refresh(); // fuerza refetch si la tabla está en la misma página
    } catch (err) {
      toast.error('No se pudo eliminar el usuario');
    }
  };

  return {
    deleteUser,
    isLoading,
    apiError: (error as any)?.status ?? null,
  };
}
