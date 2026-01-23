'use client';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsCourses } from '@/features/courses/config/tableColumnsCourses';
import { useTranslation } from '@/i18n';
import { useGetCoursesQuery } from '@/lib/services/api/coursesApi/coursesApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { BookPlus } from 'lucide-react';

export default function Page() {
  const { t } = useTranslation();
  const { session } = useSessionContext();

  const { data: coursesData, isLoading, isFetching, error, status, isSuccess, isError } = useGetCoursesQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={t('c.courses')} />

      <CreateButton href="/courses/add" label={t('a.addCourse')} icon={<BookPlus />} align="right" />

      <DataTable data={coursesData?.data ?? []} columns={tableColumnsCourses(t, currentUserId)} />
    </div>
  );
}
