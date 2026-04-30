'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumnsCourses } from '@/features/courses/config/tableColumnsCourses';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useCompanyNavigation } from '@/hooks/useCompanyNavigation';
import { useTranslation } from '@/i18n';
import { DataTable } from '@/lib/phonix-ui';
import { useGetCoursesQuery } from '@/lib/services/api/coursesApi/coursesApi';
import { Courses } from '@/lib/services/api/coursesApi/interface';
import { useSessionContext } from '@/utils/context/sessionContext';

interface CoursesPageProps {
  baseRoute?: string;
}

export default function CoursesPage({ baseRoute = '/manage-companies/courses' }: CoursesPageProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });
  const companyNav = useCompanyNavigation();

  const { data: coursesData, isLoading, isFetching } = useGetCoursesQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredCourses = companyId
    ? (coursesData?.data ?? []).filter((course: Courses) => course.companyId === companyId)
    : (coursesData?.data ?? []);

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader
        title={`${t('c.courses')} - ${companyName}`}
        buttonLabel={t('a.addCourse')}
        buttonHref={companyNav.href(`${baseRoute}/add`)}
      />
      <DataTable
        striped
        data={filteredCourses}
        variant="primary"
        columns={tableColumnsCourses(t, currentUserId, companyNav.href)}
        isLoading={isLoading || isFetching}
        storageKey="datatable-courses"
        searchable
        enableFilters={false}
        labels={{
          columnsButton: 'Columnas',
          rowsSuffix: 'filas',
          fallbackColumnName: 'Columna',
        }}
      />
    </div>
  );
}
