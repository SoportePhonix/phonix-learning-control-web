import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { EnrollStudentModal } from '@/features/enrollment/componentes/EnrollStudentModal';
import { UnenrollStudentModal } from '@/features/enrollment/componentes/UnenrollStudentModal';
import { TranslationKey } from '@/i18n';
import { Students } from '@/lib/services/api/studentsApi/interface';
import { capitalizeFirst } from '@/utils/textFormatters';

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
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '210px', textAlign: 'center', padding: '0 2px' }}>
        {capitalizeFirst(row.getValue('firstname'))}
      </span>
    ),
  },
  {
    accessorKey: 'lastname',
    header: t('l.lastName'),
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '210px', textAlign: 'center', padding: '0 2px' }}>
        {capitalizeFirst(row.getValue('lastname'))}
      </span>
    ),
  },
  {
    accessorKey: 'documentType',
    header: t('t.typeOfIdentificationDocument'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.documentType?.name;
      return (
        <span style={{ display: 'inline-block', width: '225px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'documentNumber',
    header: t('i.identificationDocument'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.documentNumber;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'email',
    header: t('e.email'),
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '300px', textAlign: 'center', padding: '0 2px' }}>
        {row.getValue('email')}
      </span>
    ),
  },
  {
    accessorKey: 'username',
    header: t('u.username'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.username;
      return (
        <span style={{ display: 'inline-block', width: '200px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: t('d.description'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.description;
      return (
        <span style={{ display: 'inline-block', width: '250px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    header: t('c.company'),
    enableSorting: true,
    cell: ({ row }) => {
      const company = row.original.company;
      return (
        <span style={{ display: 'inline-block', width: '250px', textAlign: 'center', padding: '0 2px' }}>
          {company ? company.name : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: t('p.phone'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.phone;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'city',
    header: t('c.city'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.city;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'country',
    header: t('c.country'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.country;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'institution',
    header: t('i.institution'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.institution;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'department',
    header: t('d.department'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.department;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'address',
    header: t('a.address'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.address;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    header: t('a.area'),
    enableSorting: true,
    cell: ({ row }) => {
      const area = row.original.area;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {area ? area.name : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    header: t('p.position'),
    enableSorting: true,
    cell: ({ row }) => {
      const position = row.original.position;
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
          {position ? position.name : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: t('s.status'),
    enableSorting: true,
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
      const studentId = row.original.id;
      const isCurrentUser = Number(currentUserId) === Number(studentId);

      return (
        <div className="flex justify-center">
          <EnrollStudentModal studentId={Number(studentId)} />
          <UnenrollStudentModal studentId={Number(studentId)} />
          <EditButton href={`/manage-companies/students/${studentId}/update`} tooltipText={t('e.editUser')} />
          {!isCurrentUser && <DeleteStudent studentId={Number(studentId)} />}
        </div>
      );
    },
  },
];
