'use client';

import { studentsColumns } from '@/app/(users)/students/hooks/columns';
import { studentsMock } from '@/app/(users)/students/hooks/students.mock';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title="Estudiantes" />
      <DataTable columns={studentsColumns} data={studentsMock} />
    </div>
  );
}
