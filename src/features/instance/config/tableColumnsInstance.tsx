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
      return (
        <span style={{ display: 'inline-block', width: '170px', textAlign: 'center', padding: '0 2px' }}>{nit}</span>
      );
    },
  },
  {
    accessorKey: 'name',
    header: t('n.name'),
    enableSorting: true,
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return (
        <span style={{ display: 'inline-block', width: '230px', textAlign: 'center', padding: '0 2px' }}>{name}</span>
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
        <span style={{ display: 'inline-block', width: '250px', textAlign: 'center', padding: '0 2px' }}>
          {description}
        </span>
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
    enableSorting: false,
    cell: ({ row }) => {
      const instance = row.original;
      const instanceId = String(instance.id);

      return (
        <div className="flex justify-center">
          <EditButton href={`/instances/${instanceId}/update`} tooltipText={t('e.editInstance')} />
          <DeleteInstance instanceId={instanceId} />
        </div>
      );
    },
  },
];
