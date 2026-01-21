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
      console.log('ROW ORIGINAL =>', row.original);

      const status = row.original.status;

      const statusLabelMap: Record<string, string> = {
        active: t('a.active'),
        inactive: t('i.inactive'),
        1: t('a.active'),
        0: t('i.inactive'),
        true: t('a.active'),
        false: t('i.inactive'),
      };

      return <StatusBadge status={status} label={statusLabelMap[String(status)] ?? String(status)} />;
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
