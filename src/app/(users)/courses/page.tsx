'use client';

import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { courseColumns } from '@/hooks/courses/columns';
import { coursesMock } from '@/hooks/courses/courses.mock';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title="Cursos" />
      <DataTable columns={courseColumns} data={coursesMock} />
    </div>
  );
}
