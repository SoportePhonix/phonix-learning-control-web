import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Courses } from '@/lib/services/api/coursesApi/interface';

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
  },
  {
    accessorKey: 'fullName',
    header: t('f.fullName'),
  },
  {
    accessorKey: 'categoryId',
    header: t('c.categoryId'),
  },
  {
    accessorKey: 'summary',
    header: t('s.summary'),
    cell: ({ row }) => {
      const value = row.original.summary;
      return value ? value : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'status',
    header: t('s.status'),
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

      return <StatusBadge type={config.type} label={config.label} />;
    },
  },
  {
    accessorKey: 'startDate',
    header: t('s.startDate'),
    cell: ({ row }) => (row.original.startDate ? formatDate(row.original.startDate) : EMPTY_VALUE(t)),
  },
  {
    accessorKey: 'endDate',
    header: t('e.endDate'),
    cell: ({ row }) => (row.original.endDate ? formatDate(row.original.endDate) : EMPTY_VALUE(t)),
  },
  {
    header: t('c.company'),
    cell: ({ row }) => {
      const { companyName } = row.original;

      if (!companyName) {
        return <span className="text-muted-foreground">—</span>;
      }

      return <span>{companyName}</span>;
    },
  },

  {
    accessorKey: 'id',
    header: t('a.actions'),
    cell: ({ row }) => {
      const courseId = Number(row.original.id);

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/courses/${courseId}/update`} tooltipText={t('e.editCourse')} />
          <DeleteCourse courseId={courseId} />
        </div>
      );
    },
  },
];
