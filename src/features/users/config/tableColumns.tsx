import { EditButton } from '@/components/EditButton';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { User } from '@/lib/services/api/usersApi/interface/users.interface';

import { DeleteUser } from '../componentes/DeleteUser';

export const tableColumns = (t: (key: TranslationKey) => string, currentUserId?: number): CustomColumnDef<User>[] => [
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
      const roles = row.original.role;

      const varios = roles.length > 1;

      return (
        <div className="flex flex-col">
          {roles.map((r) => (
            <span key={r.id}>{varios ? `- ${r.name}` : r.name}</span>
          ))}
        </div>
      );
    },
  },
  {
    header: 'Empresa',
    cell: ({ row }) => {
      const { companies = [], role = [] } = row.original;
      const isAdmin = role.some((r) => r.name === 'Administrator');

      if (isAdmin) {
        return <span className="text-muted-foreground ">{t('n.notApplicable' as TranslationKey)}</span>;
      }

      if (companies.length === 0) {
        return <span className="text-muted-foreground">—</span>;
      }

      const varios = companies.length > 1;

      return (
        <div className="flex flex-col">
          {companies.map((company) => (
            <span key={company.id}>{varios ? `- ${company.name}` : company.name}</span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'id',
    header: t('a.actions'),
    cell: ({ row }) => {
      const userId = row.original.id;
      const isCurrentUser = Number(currentUserId) === Number(userId);

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/users/${userId}/update`} tooltipText={t('e.editUser')} />
          {!isCurrentUser && <DeleteUser userId={Number(userId)} />}
        </div>
      );
    },
  },
];
