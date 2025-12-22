'use client';

import { DataTable } from '@/components/ui/data-table';
import { trainingRoutesColumns } from '@/hooks/students/info/trainingRoutes.columns';
import { trainingRoutesMock } from '@/hooks/students/info/trainingRoutes.mock';

export function TrainingRoutesTable() {
  return (
    <div
      className="
    w-[748px]
    h-[341px]
    flex flex-col

    [&_.data-table-search]:hidden
    [&_.data-table-filters]:hidden
    [&_.data-table-pagination]:hidden

    [&_th]:py-2
    [&_td]:py-2
    [&_th]:text-xs
    [&_td]:text-sm
      "
    >
      <DataTable columns={trainingRoutesColumns} data={trainingRoutesMock} />
    </div>
  );
}
