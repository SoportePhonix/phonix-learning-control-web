import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Positions } from '@/lib/services/api/positionsApi/interface';

import { DeletePosition } from '../componentes/DeletePosition';

const EMPTY_VALUE = (t: (key: TranslationKey) => string) => (
  <span className="text-muted-foreground">{t('n.notProvided')}</span>
);

export const tableColumnsPositions = (
  t: (key: TranslationKey) => string,
  currentPositionId?: number,
  buildHref?: (path: string) => string
): CustomColumnDef<Positions>[] => [
  {
    accessorKey: 'name',
    header: t('n.name'),
    enableSorting: true,
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return (
        <span style={{ display: 'inline-block', width: '200px', textAlign: 'center', padding: '0 2px' }}>
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
        <span style={{ display: 'inline-block', width: '250px', textAlign: 'center', padding: '0 2px' }}>
          {description ? description : EMPTY_VALUE(t)}
        </span>
      );
    },
  },
  {
    header: t('c.company'),
    enableSorting: true,
    cell: ({ row }) => {
      const { companyName } = row.original;
      return (
        <span style={{ display: 'inline-block', width: '200px', textAlign: 'center', padding: '0 2px' }}>
          {companyName ? companyName : EMPTY_VALUE(t)}
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
      const position = row.original;
      const positionId = Number(position.id);
      const editHref = buildHref
        ? buildHref(`/manage-companies/positions/${positionId}/update`)
        : `/manage-companies/positions/${positionId}/update`;

      return (
        <div className="flex justify-center">
          <EditButton href={editHref} tooltipText={t('e.editPosition')} />
          <DeletePosition positionId={positionId} />
        </div>
      );
    },
  },
];
