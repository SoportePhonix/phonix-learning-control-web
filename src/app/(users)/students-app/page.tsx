'use client';

import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/ui/data-table';

import { studentsColumns } from './hooks/columns';
import { studentsMock } from './hooks/students.mock';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <PageHeader title="Estudiantes" />
      <DataTable columns={studentsColumns} data={studentsMock} />
    </div>
  );
}
