import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';

import { useDeleteUser } from '../hooks/useDeleteUser';

export const DeleteUser = ({ userId }: { userId: number }) => {
  const { deleteUser, isLoading } = useDeleteUser();

  return (
    <AlertConfirmDialogDestructive
      tooltipText="Eliminar usuario"
      title="Eliminar usuario"
      description="¿Estás seguro de eliminar este usuario?"
      onConfirm={async () => await deleteUser(userId)}
      confirmText="Eliminar"
      cancelText="Cancelar"
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
