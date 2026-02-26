import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import type { Instance as InstanceType } from '@/lib/services/api/instanceApi/interface/instance.interface';

import { DeleteInstance } from '../componentes/DeleteInstance';

const EMPTY_VALUE = (t: (key: TranslationKey) => string) => (
  <span className="text-muted-foreground">{t('n.notProvided')}</span>
);

export const tableColumnsInstance = (
  t: (key: TranslationKey) => string,
  currentInstanceId?: number
): CustomColumnDef<InstanceType>[] => [
  {
    accessorKey: 'nit',
    header: t('n.nit'),
    enableSorting: true,
    cell: ({ row }) => {
      const nit = row.getValue('nit') as string;
      return nit ? <div className="font-medium text-foreground">{nit}</div> : EMPTY_VALUE(t);
    },
  },
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
      const instance = row.original;
      const instanceNit = String(instance.nit ?? instance.nit ?? '');

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/instances/${instanceNit}/update`} tooltipText={t('e.editInstance')} />
          <DeleteInstance instanceNit={instanceNit} />
        </div>
      );
    },
  },
];
