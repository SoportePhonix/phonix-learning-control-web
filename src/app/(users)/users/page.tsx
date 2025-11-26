'use client';

import { Typography } from '@/components/ui/typography';
import { useTranslation } from '@/i18n';
import { useGetAllUsersQuery } from '@/lib/services/api/usersApi/usersApi';

export default function Page() {
  const { t } = useTranslation();

  const { data: usersData, isLoading, isFetching, error } = useGetAllUsersQuery();

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        {t('l.login')}
      </Typography>

      <Typography variant="parrafo" className="text-var--negro font-light mb-4">
        <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(usersData, null, 2)}</pre>
      </Typography>
    </div>
  );
}
