import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
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
    header: t('c.company'),
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
    accessorKey: 'status',
    header: t('s.status'),
    cell: ({ row }) => {
      console.log('ROW ORIGINAL =>', row.original);

      const status = row.original.status;

      const statusLabelMap: Record<string, string> = {
        active: t('a.active'),
        inactive: t('i.inactive'),
        1: t('a.active'),
        0: t('i.inactive'),
        true: t('a.active'),
        false: t('i.inactive'),
      };

      return <StatusBadge status={status} label={statusLabelMap[String(status)] ?? String(status)} />;
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
