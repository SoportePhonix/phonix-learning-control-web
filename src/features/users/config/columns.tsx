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
import { Button } from '@/components/ui/button';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { User } from '@/lib/services/api/usersApi/interface/users.interface';
import { Edit, Edit3, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { useDeleteUser } from '../hooks/useDeleteUser';

function DeleteUserCell({ userId }: { userId: number }) {
  const { deleteUser, isLoading } = useDeleteUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isLoading}>
          <Trash2 />
          <span className="sr-only">Eliminar usuario</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
          <AlertDialogDescription>¿Estás seguro de eliminar este usuario?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              type="button"
              onClick={async () => {
                await deleteUser(userId);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const columns = (t: (key: TranslationKey) => string): CustomColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: t('n.name'),
  },
  {
    accessorKey: 'lastName',
    header: t('l.lastName'),
  },
  {
    accessorKey: 'typeOfIdentificationDocument.name',
    header: t('t.typeOfIdentificationDocument'),
  },
  {
    accessorKey: 'identificationDocument',
    header: t('i.identificationDocument'),
  },
  {
    accessorKey: 'email',
    header: t('e.email'),
  },
  {
    header: t('r.role'),
    cell: ({ row }) => {
      //Te da el control total del contenido de la celda
      const roles = row.original.role; //COntiene el objeto del usuario

      const varios = roles.length > 1; //Verificamos si hay varios roles

      return (
        <div className="flex flex-col">
          {roles.map(
            (
              r //Recorremos los roles con .map()
            ) => (
              <span key={r.id}>
                {varios ? `- ${r.name}` : r.name} {/* Decidimos si se lista o no */}
              </span>
            )
          )}
        </div>
      );
    },
  },

  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const userId = row.original.id;

      return (
        <Link href={`/users/${userId}/update`}>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit3 className="h-4 w-4" />
            <span className="sr-only">Editar usuario</span>
          </Button>
        </Link>
      );
    },
  },
  {
    id: 'delete',
    header: '',
    cell: ({ row }) => <DeleteUserCell userId={row.original.id} />,
  },
];
