'use client';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsCourses } from '@/features/courses/config/tableColumnsCourses';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useTranslation } from '@/i18n';
import { useGetCoursesQuery } from '@/lib/services/api/coursesApi/coursesApi';
import { Courses } from '@/lib/services/api/coursesApi/interface';
import { useSessionContext } from '@/utils/context/sessionContext';
import { BookPlus } from 'lucide-react';

interface CoursesPageProps {
  baseRoute?: string;
}

export default function CoursesPage({ baseRoute = '/manage-companies/courses' }: CoursesPageProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });

  const { data: coursesData } = useGetCoursesQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredCourses = companyId
    ? (coursesData?.data ?? []).filter((course: Courses) => course.companyId === companyId)
    : (coursesData?.data ?? []);

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={`${t('c.courses')} - ${companyName}`} />

      <CreateButton href={`${baseRoute}/add`} label={t('a.addCourse')} icon={<BookPlus />} align="right" />

      <DataTable data={filteredCourses} columns={tableColumnsCourses(t, currentUserId)} />
    </div>
  );
}
