'use client';

import { CreateButton } from '@/components/CreateButton';
import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsAreas } from '@/features/areas/config/tableColumnsAreas';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useTranslation } from '@/i18n';
import { useGetAreasQuery } from '@/lib/services/api/areasApi/areasApi';
import { Areas } from '@/lib/services/api/areasApi/interface';
import { useSessionContext } from '@/utils/context/sessionContext';
import { NotebookPen } from 'lucide-react';

interface AreasPageProps {
  baseRoute?: string;
}

export default function AreasPage({ baseRoute = '/manage-companies/areas' }: AreasPageProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });

  const { data: areasData } = useGetAreasQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredAreas = companyId
    ? (areasData?.data ?? []).filter((area: Areas) => area.companyId === companyId)
    : (areasData?.data ?? []);

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <PageHeader title={`${t('a.areas')} - ${companyName}`} />

      <CreateButton href={`${baseRoute}/add`} label={t('a.addArea')} icon={<NotebookPen />} align="right" />

      <DataTable data={filteredAreas} columns={tableColumnsAreas(t, currentUserId)} />
    </div>
  );
}
