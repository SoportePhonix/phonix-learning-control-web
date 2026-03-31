'use client';

import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/ui/data-table';

import { trainingPathwaysColumns } from './hooks/columns';
import { trainingPathwaysMock } from './hooks/trainingPathways.mock';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <PageHeader title="Rutas de información" />
      <DataTable columns={trainingPathwaysColumns} data={trainingPathwaysMock} />
    </div>
  );
}
