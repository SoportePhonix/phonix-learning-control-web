import React from 'react';

import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { Trash2 } from 'lucide-react';

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
// --

// function DeleteUserCell({ userId }: { userId: number }) {
//   const { deleteUser, isLoading } = useDeleteUser();

//   return (
//     <AlertConfirmDialog
//       icon={Trash2}
//       tooltipText="Eliminar usuario"
//       title="Eliminar usuario"
//       description="¿Estás seguro de eliminar este usuario?"
//       onConfirm={async () => await deleteUser(userId)}
//       confirmText="Eliminar"
//       cancelText="Cancelar"
//       variant="destructive"
//       isLoading={isLoading}
//     />
//   );
// }
