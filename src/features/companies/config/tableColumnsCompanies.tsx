import { CustomColumnDef } from '@/components/ui/data-table';
import { TranslationKey } from '@/i18n';
import { Companies } from '@/lib/services/api/companiesApi/interface';
import { User } from '@/lib/services/api/usersApi/interface/users.interface';

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
  },
];
