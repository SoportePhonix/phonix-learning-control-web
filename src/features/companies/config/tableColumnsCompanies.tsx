import { EditButton } from '@/components/EditButton';
import { StatusBadge } from '@/components/StatusBadge';
import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Companies } from '@/lib/services/api/companiesApi/interface';

import { DeleteCompany } from '../componentes/DeleteCompany';

export const tableColumnsCompanies = (
  t: (key: TranslationKey) => string,
  currentCompaniesId?: number
): CustomColumnDef<Companies>[] => [
  {
    accessorKey: 'name',
    header: t('n.name'),
  },
  {
    accessorKey: 'nit',
    header: t('n.nit'),
  },
  {
    accessorKey: 'email',
    header: t('e.email'),
  },
  {
    accessorKey: 'status',
    header: t('s.status'),
    cell: ({ row }) => {
      const status = String(row.original.status).toLowerCase();

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
    cell: ({ row }) => {
      const companyId = Number(row.original.id);

      return (
        <div className="flex items-center gap-2">
          <EditButton href={`/companies/${companyId}/update`} tooltipText={t('e.editCompany')} />
          <DeleteCompany companyId={companyId} />
        </div>
      );
    },
  },
];
