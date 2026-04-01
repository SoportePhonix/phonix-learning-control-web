import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Companies } from '@/lib/services/api/companiesApi/interface';

import { DeleteCompany } from '../componentes/DeleteCompany';
import { ManageCompany } from '../componentes/ManageCompany';

export const tableColumnsCompanies = (t: (key: TranslationKey) => string): CustomColumnDef<Companies>[] => [
  {
    accessorKey: 'name',
    header: t('n.name'),
    enableSorting: true,
  },
  {
    accessorKey: 'nit',
    header: t('n.nit'),
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: t('e.email'),
    enableSorting: true,
  },
  {
    id: 'instance',
    header: t('i.instance'),
    enableSorting: true,
    cell: ({ row }) => {
      const instance = (row.original as any).instance;
      return instance?.name;
    },
  },
  {
    accessorKey: 'status',
    header: t('s.status'),
    enableSorting: true,
    cell: ({ row }) => {
      const status = String(row.original.status).toLowerCase();

      const statusMap: Record<string, { type: 'success' | 'progress' | 'error'; label?: TranslationKey }> = {
        active: { type: 'success', label: 'a.activeF' },
        '1': { type: 'success', label: 'a.activeF' },
        true: { type: 'success', label: 'a.activeF' },

        inactive: { type: 'error', label: 'i.inactiveF' },
        '0': { type: 'error', label: 'i.inactiveF' },
        false: { type: 'error', label: 'i.inactiveF' },
      };

      const config = statusMap[status] ?? ({ type: 'progress' } as const);

      return <StatusBadge type={config.type} label={config.label} />;
    },
  },
  {
    accessorKey: 'id',
    header: t('a.actions'),
    cell: ({ row }) => {
      const companyId = Number(row.original.id);
      const companyName = row.original.name;

      return (
        <div className="flex items-center gap-2">
          <ManageCompany companyId={companyId} companyName={companyName} />
          <EditButton href={`/companies/${companyId}/update`} tooltipText={t('e.editCompany')} />
          <DeleteCompany companyId={companyId} />
        </div>
      );
    },
  },
];
