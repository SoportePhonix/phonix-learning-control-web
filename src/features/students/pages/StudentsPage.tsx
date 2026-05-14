'use client';

import { PageHeader } from '@/components/page-header';
import { tableColumnsStudents } from '@/features/students/config/tableColumnsStudents';
import { useCompanyContext, useCompanyNavigation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { DataTable } from '@/lib/phonix-ui';
import { Students } from '@/lib/services/api/studentsApi/interface';
import { useGetStudentsQuery } from '@/lib/services/api/studentsApi/studentsApi';
import { useSessionContext } from '@/utils/context/sessionContext';

interface StudentsPageProps {
  baseRoute?: string;
}

export default function StudentsPage({ baseRoute = '/manage-companies/students' }: StudentsPageProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });
  const companyNav = useCompanyNavigation();

  const { data: studentsData, isLoading, isFetching } = useGetStudentsQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredStudents = companyId
    ? (studentsData?.data ?? []).filter((student: Students) => student.company?.id === companyId)
    : (studentsData?.data ?? []);

  return (
    <div className="mb-8 -mt-1 px-2 flex flex-col">
      <PageHeader
        title={`${t('s.students')}`}
        buttonLabel={t('a.addStudent')}
        buttonHref={companyNav.href(`${baseRoute}/add`)}
      />
      <DataTable
        striped
        data={filteredStudents}
        variant="primary"
        columns={tableColumnsStudents(t, currentUserId, companyNav.href)}
        isLoading={isLoading || isFetching}
        storageKey="datatable-students"
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
