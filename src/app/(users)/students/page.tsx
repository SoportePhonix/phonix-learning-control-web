'use client';

import { DataTable } from '@/components/ui/data-table';
import { Typography } from '@/components/ui/typography';
import { studentsColumns } from '@/hooks/students/columns';
import { studentsMock } from '@/hooks/students/students.mock';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        Estudiantes
      </Typography>

      <DataTable columns={studentsColumns} data={studentsMock} />
    </div>
  );
}
