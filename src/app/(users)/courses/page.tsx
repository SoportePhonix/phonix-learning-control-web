'use client';

import { courseColumns } from '@/app/(users)/courses/hooks/columns';
import { coursesMock } from '@/app/(users)/courses/hooks/courses.mock';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <SectionTitle title="Cursos" />
      <DataTable columns={courseColumns} data={coursesMock} />
    </div>
  );
}
