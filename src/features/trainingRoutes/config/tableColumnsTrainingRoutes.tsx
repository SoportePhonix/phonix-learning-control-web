import { EditButton } from '@/components/EditButton';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { TrainingRoute } from '@/lib/services/api/trainingRoutesApi/interface';

import { DeleteTrainingRoute } from '../componentes/DeleteTrainingRoute';

const EMPTY_VALUE = (t: (key: TranslationKey) => string) => (
  <span className="text-muted-foreground">{t('n.notProvided')}</span>
);

export const tableColumnsTrainingRoutes = (
  t: (key: TranslationKey) => string,
  buildHref?: (path: string) => string
): CustomColumnDef<TrainingRoute>[] => [
  {
    accessorKey: 'name',
    header: t('n.name'),
    enableSorting: true,
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return (
        <span style={{ display: 'inline-block', width: '225px', textAlign: 'center', padding: '0 2px' }}>
          {name ? name : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'description',
    header: t('d.description'),
    enableSorting: true,
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return (
        <span style={{ display: 'inline-block', width: '225px', textAlign: 'center', padding: '0 2px' }}>
          {description ? description : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'companyName',
    header: t('c.company'),
    enableSorting: true,
    cell: ({ row }) => {
      const companyName = row.getValue('companyName') as string;
      return (
        <span style={{ display: 'inline-block', width: '225px', textAlign: 'center', padding: '0 2px' }}>
          {companyName ? companyName : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'areaName',
    header: t('a.area'),
    enableSorting: true,
    cell: ({ row }) => {
      const areaName = row.getValue('areaName') as string;
      return (
        <span style={{ display: 'inline-block', width: '225px', textAlign: 'center', padding: '0 2px' }}>
          {areaName ? areaName : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'positionName',
    header: t('p.post'),
    enableSorting: true,
    cell: ({ row }) => {
      const positionName = row.getValue('positionName') as string;
      return (
        <span style={{ display: 'inline-block', width: '225px', textAlign: 'center', padding: '0 2px' }}>
          {positionName ? positionName : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    accessorKey: 'id',
    header: t('a.actions'),
    enableSorting: false,
    cell: ({ row }) => {
      const trainingRoute = row.original;
      const id = Number(trainingRoute.id);
      const editHref = buildHref
        ? buildHref(`/manage-companies/training-routes/${id}/update`)
        : `/manage-companies/training-routes/${id}/update`;

      return (
        <div className="flex justify-center">
          <EditButton href={editHref} tooltipText={t('e.editTrainingRoute')} />
          <DeleteTrainingRoute id={id} />
        </div>
      );
    },
  },
];
