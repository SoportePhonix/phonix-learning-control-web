import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Students } from '@/lib/services/api/studentsApi/interface';

import { DeleteStudent } from '../componentes/DeleteStudent';

const EMPTY_VALUE = (t: (key: TranslationKey) => string) => (
  <span className="text-muted-foreground">{t('n.notProvided')}</span>
);

export const tableColumnsStudents = (
  t: (key: TranslationKey) => string,
  currentUserId?: number
): CustomColumnDef<Students>[] => [
  {
    accessorKey: 'firstname',
    header: t('n.name'),
  },
  {
    accessorKey: 'lastname',
    header: t('l.lastName'),
  },
  {
    accessorKey: 'documentTypeId',
    header: t('t.typeOfIdentificationDocument'),
    cell: ({ row }) => {
      const value = row.original.documentTypeId;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'documentNumber',
    header: t('i.identificationDocument'),
    cell: ({ row }) => {
      const value = row.original.documentNumber;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'email',
    header: t('e.email'),
  },
  {
    accessorKey: 'username',
    header: t('u.username'),
    cell: ({ row }) => {
      const value = row.original.username;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'description',
    header: t('d.description'),
    cell: ({ row }) => {
      const value = row.original.description;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    header: t('c.company'),
    cell: ({ row }) => {
      const { companies = [] } = row.original;

      if (!companies) {
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
    accessorKey: 'phone',
    header: t('p.phone'),
    cell: ({ row }) => {
      const value = row.original.phone;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'city',
    header: t('c.city'),
    cell: ({ row }) => {
      const value = row.original.city;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'country',
    header: t('c.country'),
    cell: ({ row }) => {
      const value = row.original.country;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'institution',
    header: t('i.institution'),
    cell: ({ row }) => {
      const value = row.original.institution;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'department',
    header: t('d.department'),
    cell: ({ row }) => {
      const value = row.original.department;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'address',
    header: t('a.address'),
    cell: ({ row }) => {
      const value = row.original.address;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'areaId',
    header: t('a.area'),
    cell: ({ row }) => {
      const value = row.original.areaId;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'positionId',
    header: t('p.position'),
    cell: ({ row }) => {
      const value = row.original.positionId;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'status',
    header: t('s.status'),
    cell: ({ row }) => {
      const status = String(row.original.status ?? '').toLowerCase();

      const statusMap: Record<string, { type: 'success' | 'progress' | 'error'; label?: TranslationKey }> = {
        active: { type: 'success', label: 'a.active' },
        '1': { type: 'success', label: 'a.active' },
        true: { type: 'success', label: 'a.active' },
        inactive: { type: 'error', label: 'i.inactive' },
        '0': { type: 'error', label: 'i.inactive' },
        false: { type: 'error', label: 'i.inactive' },
      };

      const config = statusMap[status] ?? ({ type: 'progress' } as const);

      return <StatusBadge type={config.type} label={config.label} />;
    },
  },
  {
    accessorKey: 'id',
    header: t('a.actions'),
    cell: ({ row }) => {
      const studentId = row.original.id;
      const isCurrentUser = Number(currentUserId) === Number(studentId);

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/users/${studentId}/update`} tooltipText={t('e.editUser')} />
          {!isCurrentUser && <DeleteStudent studentId={Number(studentId)} />}
        </div>
      );
    },
  },
];
