'use client';

import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { studentsColumns } from '@/hooks/students/columns';
import { studentsMock } from '@/hooks/students/students.mock';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title="Estudiantes" />
      <DataTable columns={studentsColumns} data={studentsMock} />
    </div>
  );
}
