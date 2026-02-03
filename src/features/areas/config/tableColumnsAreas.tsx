import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Areas } from '@/lib/services/api/areasApi/interface';

import { DeleteArea } from '../componentes/DeleteArea';

const EMPTY_VALUE = (t: (key: TranslationKey) => string) => (
  <span className="text-muted-foreground">{t('n.notProvided')}</span>
);

export const tableColumnsAreas = (
  t: (key: TranslationKey) => string,
  currentAreaId?: number
): CustomColumnDef<Areas>[] => [
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
        <div className="max-w-50 truncate text-muted-foreground" title={description}>
          {description}
        </div>
      ) : (
        EMPTY_VALUE(t)
      );
    },
  },
  {
    header: t('c.company'),
    enableSorting: true,
    cell: ({ row }) => {
      const { companyName } = row.original;

      if (!companyName) {
        return EMPTY_VALUE(t);
      }

      return <div className="font-medium text-primary">{companyName}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: t('s.status'),
    enableSorting: true,
    cell: ({ row }) => {
      const status = String(row.original.status || '').toLowerCase();

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
    enableSorting: false,
    cell: ({ row }) => {
      const area = row.original;
      const areaId = Number(area.id);

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/areas/${areaId}/update`} tooltipText={t('e.editArea')} />
          <DeleteArea areaId={areaId} />
        </div>
      );
    },
  },
];
