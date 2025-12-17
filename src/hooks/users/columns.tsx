import { Button } from '@/components/ui/button';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { User } from '@/lib/services/api/usersApi/interface/users.interface';
import { Edit, Edit3 } from 'lucide-react';
import Link from 'next/link';

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
];
