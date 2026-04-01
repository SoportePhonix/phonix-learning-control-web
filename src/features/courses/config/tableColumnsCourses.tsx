import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Courses } from '@/lib/services/api/coursesApi/interface';
import { capitalizeFirst } from '@/utils/textFormatters';

import { DeleteCourse } from '../componentes/DeleteCourse';

const formatDate = (value?: string) => {
  if (!value) return '-';

  const [year, month, day] = value.split('T')[0].split('-');
  return `${day}-${month}-${year}`;
};

const EMPTY_VALUE = (t: (key: TranslationKey) => string) => (
  <span className="text-muted-foreground">{t('n.notProvided')}</span>
);

export const tableColumnsCourses = (
  t: (key: TranslationKey) => string,
  currentCoursesId?: number
): CustomColumnDef<Courses>[] => [
  {
    accessorKey: 'shortName',
    header: t('s.shortName'),
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '180px', textAlign: 'center', padding: '0 2px' }}>
        {capitalizeFirst(row.getValue('shortName'))}
      </span>
    ),
  },
  {
    accessorKey: 'fullName',
    header: t('f.fullName'),
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '210px', textAlign: 'center', padding: '0 2px' }}>
        {capitalizeFirst(row.getValue('fullName'))}
      </span>
    ),
  },
  {
    accessorKey: 'summary',
    header: t('s.summary'),
    enableSorting: true,
    cell: ({ row }) => {
      const value = row.original.summary;
      return (
        <span style={{ display: 'inline-block', width: '350px', textAlign: 'center', padding: '0 2px' }}>
          {value ? value : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: t('s.status'),
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
    accessorKey: 'startDate',
    header: t('s.startDate'),
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
        {row.original.startDate ? formatDate(row.original.startDate) : EMPTY_VALUE(t)}
      </span>
    ),
  },
  {
    accessorKey: 'endDate',
    header: t('e.endDate'),
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>
        {row.original.endDate ? formatDate(row.original.endDate) : EMPTY_VALUE(t)}
      </span>
    ),
  },
  {
    header: t('c.company'),
    enableSorting: true,
    cell: ({ row }) => {
      const { companyName } = row.original;
      return (
        <span style={{ display: 'inline-block', width: '230px', textAlign: 'center', padding: '0 2px' }}>
          {companyName ? companyName : EMPTY_VALUE(t)}
        </span>
      );
    },
  },

  {
    accessorKey: 'id',
    header: t('a.actions'),
    cell: ({ row }) => {
      const courseId = Number(row.original.id);

      return (
        <div className="flex justify-center">
          <EditButton href={`/manage-companies/courses/${courseId}/update`} tooltipText={t('e.editCourse')} />
          <DeleteCourse courseId={courseId} />
        </div>
      );
    },
  },
];
