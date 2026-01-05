'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeleteCompaniesMutation } from '@/lib/services/api/companiesApi/companiesApi';
import { Trash2 } from 'lucide-react';

export function TableFormCompanies({ companyId }: { companyId: number }) {
  const [deleteCompany, { isLoading }] = useDeleteCompaniesMutation();

  const handleDelete = async () => {
    try {
      await deleteCompany({ id: companyId }).unwrap();
    } catch {
      alert('Error al eliminar la empresa');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-600 hover:text-red-800" title="Eliminar empresa">
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar empresa?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La empresa será eliminada permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
