import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';

import { useDeleteCompany } from '../hooks/useDeleteCompany';

export const DeleteCompany = ({ companyId }: { companyId: number }) => {
  const { deleteCompany, isLoading } = useDeleteCompany();

  return (
    <AlertConfirmDialogDestructive
      tooltipText="Eliminar usuario"
      title="Eliminar usuario"
      description="¿Estás seguro de eliminar este usuario?"
      onConfirm={async () => await deleteCompany(companyId)}
      confirmText="Eliminar"
      cancelText="Cancelar"
      variant="destructive"
      isLoading={isLoading}
    />
  );
};
