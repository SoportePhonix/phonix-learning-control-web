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
  currentAreaId?: number,
  buildHref?: (path: string) => string
): CustomColumnDef<Areas>[] => [
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
        <span style={{ display: 'inline-block', width: '200px', textAlign: 'center', padding: '0 2px' }}>
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
        active: { type: 'success', label: 'a.activeF' },
        '1': { type: 'success', label: 'a.activeF' },
        true: { type: 'success', label: 'a.activeF' },

        inactive: { type: 'error', label: 'i.inactiveF' },
        '0': { type: 'error', label: 'i.inactiveF' },
        false: { type: 'error', label: 'i.inactiveF' },
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
      const area = row.original;
      const areaId = Number(area.id);
      const editHref = buildHref
        ? buildHref(`/manage-companies/areas/${areaId}/update`)
        : `/manage-companies/areas/${areaId}/update`;

      return (
        <div className="flex justify-center">
          <EditButton href={editHref} tooltipText={t('e.editArea')} />
          <DeleteArea areaId={areaId} />
        </div>
      );
    },
  },
];
