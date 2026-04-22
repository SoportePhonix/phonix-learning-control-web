import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { TranslationKey } from '@/i18n';
import { User } from '@/lib/services/api/usersApi/interface/users.interface';
import { Role, normalizeRoleName } from '@/rbac/config/roles';
import { capitalizeFirst } from '@/utils/textFormatters';
import { CustomColumnDef } from '@soportephonix/phx-datatable';

import { DeleteUser } from '../componentes/DeleteUser';

export const tableColumns = (t: (key: TranslationKey) => string, currentUserId?: number): CustomColumnDef<User>[] => [
  {
    accessorKey: 'name',
    header: t('n.name'),
    canHide: false,
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '230px', textAlign: 'center', padding: '0 2px' }}>
        {capitalizeFirst(row.getValue('name'))}
      </span>
    ),
  },
  {
    accessorKey: 'lastName',
    header: t('l.lastName'),
    canHide: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '230px', textAlign: 'center', padding: '0 2px' }}>
        {capitalizeFirst(row.getValue('lastName'))}
      </span>
    ),
  },
  {
    accessorKey: 'typeOfIdentificationDocument.name',
    header: t('t.typeOfIdentificationDocument'),
    canHide: true,
    enableSorting: true,
    cell: ({ row }) => {
      const typeOfIdentificationDocument = (row.original as any).typeOfIdentificationDocument?.name;
      return (
        <span style={{ display: 'inline-block', width: '230px', textAlign: 'center', padding: '0 2px' }}>
          {typeOfIdentificationDocument}
        </span>
      );
    },
  },
  {
    accessorKey: 'identificationDocument',
    header: t('i.identificationDocument'),
    canHide: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
        {capitalizeFirst(row.getValue('identificationDocument'))}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: t('e.email'),
    canHide: false,
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '250px', textAlign: 'center', padding: '0 2px' }}>
        {row.getValue('email')}
      </span>
    ),
  },
  {
    header: t('r.role'),
    canHide: true,
    enableSorting: false,
    cell: ({ row }) => {
      const roles = row.original.role;
      const varios = roles.length > 1;

      return (
        <span style={{ display: 'inline-block', width: '120px', textAlign: 'center', padding: '0 2px' }}>
          <div className="flex flex-col">
            {roles.map((r) => (
              <span key={r.id}>{varios ? `- ${r.name}` : r.name}</span>
            ))}
          </div>
        </span>
      );
    },
  },
  {
    header: t('c.company'),
    canHide: true,
    enableSorting: false,
    cell: ({ row }) => {
      const { companies = [], role = [] } = row.original;
      const manager = role.some((r) => r.name === 'Manager');

      if (!manager) {
        return <span className="text-placeholder">{t('n.notApplicable' as TranslationKey)}</span>;
      }

      return (
        <span style={{ display: 'inline-block', width: '250px', textAlign: 'center', padding: '0 2px' }}>
          <div className="flex flex-col">
            {companies.map((company) => (
              <span key={company.id}>{companies.length > 1 ? `- ${company.name}` : company.name}</span>
            ))}
          </div>
        </span>
      );
    },
  },
  {
    header: t('i.instance' as TranslationKey) !== 'i.instance' ? t('i.instance' as TranslationKey) : 'Instancia',
    canHide: true,
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original as any;
      const roleName = normalizeRoleName(user.role?.[0]?.name);

      if (roleName === Role.MANAGER) {
        return <span className="text-muted-foreground">No aplica</span>;
      }

      const instanceName = user.instances?.[0]?.name || user.instance?.name || 'No aplica';

      return <span className="text-muted-foreground">{instanceName !== 'No aplica' ? instanceName : '—'}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: t('s.status'),
    canHide: true,
    enableSorting: true,
    cell: ({ row }) => {
      const status = String(row.original.status).toLowerCase();

      const statusMap: Record<string, { type: 'success' | 'progress' | 'error'; label?: TranslationKey }> = {
        active: { type: 'success', label: 'a.active' },
        '1': { type: 'success', label: 'a.active' },
        true: { type: 'success', label: 'a.active' },

        inactive: { type: 'error', label: 'i.inactive' },
        '0': { type: 'error', label: 'i.inactive' },
        false: { type: 'error', label: 'i.inactive' },
      };

      const config = statusMap[status] ?? ({ type: 'progress' } as const);

      return (
        <span style={{ display: 'inline-block', width: '120px', textAlign: 'center', padding: '0 2px' }}>
          <StatusBadge type={config.type} label={config.label} />
        </span>
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
        <div className="flex items-center">
          <EditButton href={`/users/${userId}/update`} tooltipText={t('e.editUser')} />
          {!isCurrentUser && <DeleteUser userId={Number(userId)} />}
        </div>
      );
    },
  },
];
