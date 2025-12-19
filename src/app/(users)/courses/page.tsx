'use client';

import { DataTable } from '@/components/ui/data-table';
import { Typography } from '@/components/ui/typography';
import { courseColumns } from '@/hooks/courses/columns';
import { coursesMock } from '@/hooks/courses/courses.mock';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        Cursos
      </Typography>

      <DataTable columns={courseColumns} data={coursesMock} />
    </div>
  );
}
