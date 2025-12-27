import { EditButton } from '@/components/EditButton';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { User } from '@/lib/services/api/usersApi/interface/users.interface';

import { DeleteUser } from '../componentes/DeleteUser';

export const tableColumns = (t: (key: TranslationKey) => string): CustomColumnDef<User>[] => [
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
    accessorKey: 'id',
    header: 'Acciones',
    cell: ({ row }) => {
      const userId = row.original.id;

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/users/${userId}/update`} tooltipText="Editar usuario" />
          <DeleteUser userId={userId} />
        </div>
      );
    },
  },
];
