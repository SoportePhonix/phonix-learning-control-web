'use client';

import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/ui/data-table';

import { courseColumns } from './hooks/columns';
import { coursesMock } from './hooks/courses.mock';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <PageHeader title="Cursos" />
      <DataTable columns={courseColumns} data={coursesMock} />
    </div>
  );
}
