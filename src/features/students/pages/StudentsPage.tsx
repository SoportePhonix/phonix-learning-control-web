'use client';

import { CreateButton } from '@/components/CreateButton';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { tableColumnsStudents } from '@/features/students/config/tableColumnsStudents';
import { useCompanyContext } from '@/hooks/use-company-context';
import { useTranslation } from '@/i18n';
import { Students } from '@/lib/services/api/studentsApi/interface';
import { useGetStudentsQuery } from '@/lib/services/api/studentsApi/studentsApi';
import { useSessionContext } from '@/utils/context/sessionContext';
import { BookPlus } from 'lucide-react';

interface StudentsPageProps {
  baseRoute?: string;
}

export default function StudentsPage({ baseRoute = '/manage-companies/students' }: StudentsPageProps) {
  const { t } = useTranslation();
  const { session } = useSessionContext();
  const { companyId, companyName } = useCompanyContext({ redirectOnMissing: false });

  const { data: studentsData } = useGetStudentsQuery();

  const currentUserId = session?.user?.id ? Number(session.user.id) : undefined;

  const filteredStudents = companyId
    ? (studentsData?.data ?? []).filter((student: Students) => student.company?.id === companyId)
    : (studentsData?.data ?? []);

  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title={`${t('s.students')} - ${companyName}`} />
      <CreateButton href={`${baseRoute}/add`} label={t('a.addStudent')} icon={<BookPlus />} align="right" />

      <DataTable data={filteredStudents} columns={tableColumnsStudents(t, currentUserId)} />
    </div>
  );
}
