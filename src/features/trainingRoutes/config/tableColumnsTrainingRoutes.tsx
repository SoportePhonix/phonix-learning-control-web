import { EditButton } from '@/components/EditButton';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { TrainingRoute } from '@/lib/services/api/trainingRoutesApi/interface';

import { DeleteTrainingRoute } from '../componentes/DeleteTrainingRoute';

const EMPTY_VALUE = (t: (key: TranslationKey) => string) => (
  <span className="text-muted-foreground">{t('n.notProvided')}</span>
);

export const tableColumnsTrainingRoutes = (t: (key: TranslationKey) => string): CustomColumnDef<TrainingRoute>[] => [
  {
    accessorKey: 'name',
    header: t('n.name'),
    enableSorting: true,
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return name ? <div className="font-medium text-foreground">{name}</div> : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'description',
    header: t('d.description'),
    enableSorting: true,
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return description ? (
        <div className="max-w-60 truncate text-muted-foreground" title={description}>
          {description}
        </div>
      ) : (
        EMPTY_VALUE(t)
      );
    },
  },
  {
    accessorKey: 'companyName',
    header: t('c.company'),
    enableSorting: true,
    cell: ({ row }) => {
      const companyName = row.getValue('companyName') as string;
      return companyName ? <div className="text-muted-foreground">{companyName}</div> : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'areaName',
    header: t('a.area'),
    enableSorting: true,
    cell: ({ row }) => {
      const areaName = row.getValue('areaName') as string;
      return areaName ? <div className="text-muted-foreground">{areaName}</div> : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'positionName',
    header: t('p.post'),
    enableSorting: true,
    cell: ({ row }) => {
      const positionName = row.getValue('positionName') as string;
      return positionName ? <div className="text-muted-foreground">{positionName}</div> : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'id',
    header: t('a.actions'),
    enableSorting: false,
    cell: ({ row }) => {
      const trainingRoute = row.original;
      const id = Number(trainingRoute.id);

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/training-routes/${id}/update`} tooltipText={t('e.editTrainingRoute')} />
          <DeleteTrainingRoute id={id} />
        </div>
      );
    },
  },
];
