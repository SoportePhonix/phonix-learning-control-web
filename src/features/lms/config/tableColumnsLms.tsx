import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Lms } from '@/lib/services/api/lmsApi/interface';

import { DeleteLms } from '../componentes/DeleteLms';

const EMPTY_VALUE = (t: (key: TranslationKey) => string) => (
  <span className="text-muted-foreground">{t('n.notProvided')}</span>
);

export const tableColumnsLms = (t: (key: TranslationKey) => string): CustomColumnDef<Lms>[] => [
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
    accessorKey: 'type',
    header: t('t.type'),
    enableSorting: true,
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return type ? <div className="text-muted-foreground">{type}</div> : EMPTY_VALUE(t);
    },
  },
  {
    accessorKey: 'url',
    header: t('u.url'),
    enableSorting: true,
    cell: ({ row }) => {
      const url = row.getValue('url') as string;
      return url ? (
        <div className="max-w-50 truncate text-muted-foreground" title={url}>
          {url}
        </div>
      ) : (
        EMPTY_VALUE(t)
      );
    },
  },
  {
    accessorKey: 'lmsIdExternal',
    header: t('l.lmsIdExternal'),
    enableSorting: true,
    cell: ({ row }) => {
      const lmsIdExternal = row.getValue('lmsIdExternal') as string;
      return lmsIdExternal ? <div className="text-muted-foreground">{lmsIdExternal}</div> : EMPTY_VALUE(t);
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
      const lms = row.original;
      const lmsId = Number(lms.id);

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/lms/${lmsId}/update`} tooltipText={t('e.editLms')} />
          <DeleteLms lmsId={lmsId} />
        </div>
      );
    },
  },
];
