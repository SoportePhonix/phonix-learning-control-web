'use client';

import { DataTable } from '@/components/ui/data-table';
import { Typography } from '@/components/ui/typography';
import { trainingPathwaysColumns } from '@/hooks/trainingPathways/columns';
import { trainingPathwaysMock } from '@/hooks/trainingPathways/trainingPathways.mock';

export default function Page() {
  return (
    <div className="pt-10 px-2 h-full w-full flex flex-col">
      <Typography variant="titulo_medio" className="text-var--negro font-light mb-4">
        Rutas de información
      </Typography>

      <DataTable columns={trainingPathwaysColumns} data={trainingPathwaysMock} />
    </div>
  );
}
