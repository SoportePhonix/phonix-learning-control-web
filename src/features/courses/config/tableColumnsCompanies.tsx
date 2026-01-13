import { EditButton } from '@/components/EditButton';
import { CustomColumnDef } from '@/components/ui/data-table';
import { useDeleteCompany } from '@/features/companies/hooks/useDeleteCompany';
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
      const status = row.original.status;

      const statusLabelMap: Record<string, string> = {
        active: t('a.active'),
        inactive: t('i.inactive'),
      };

      return statusLabelMap[status] ?? status;
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
