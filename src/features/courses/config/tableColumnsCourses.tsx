import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Courses } from '@/lib/services/api/coursesApi/interface';

export const tableColumnsCourses = (
  t: (key: TranslationKey) => string,
  currentCoursesId?: number
): CustomColumnDef<Courses>[] => [
  {
    accessorKey: 'fullName',
    header: t('f.fullName'),
  },
  {
    accessorKey: 'shortName',
    header: t('s.shortName'),
  },
  {
    accessorKey: 'categoryId',
    header: t('c.categoryId'),
  },
  {
    accessorKey: 'summary',
    header: t('s.summary'),
  },
  {
    accessorKey: 'visible',
    header: t('v.visible'),
    cell: ({ row }) => {
      const visible = row.original.visible;

      const visibleLabelMap: Record<number, string> = {
        1: t('a.active'),
        0: t('i.inactive'),
      };

      return visibleLabelMap[visible] ?? '-';
      78;
    },
  },
  {
    accessorKey: 'starDate',
    header: t('s.startDate'),
    cell: ({ row }) => {
      const value = row.original.starDate;
      if (!value) return '-';

      return new Date(value).toISOString();
    },
  },
  {
    accessorKey: 'endDate',
    header: t('e.endDate'),
    cell: ({ row }) => {
      const value = row.original.endDate;
      if (!value) return '-';

      return new Date(value).toISOString();
    },
  },
  /*   {
        accessorKey: 'id',
        header: t('a.actions'),
        cell: ({ row }) => {
          const companyId = Number(row.original.id);
    
          return (
            <div className="flex items-center gap-2">
              <EditButton href={`/companies/${companyId}/update`} tooltipText={t('e.editCompany')} />
              <DeleteCompany companyId={companyId} />
            </div>
          );
        },
      }, */
];
