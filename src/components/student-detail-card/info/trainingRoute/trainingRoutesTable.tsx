'use client';

import { DataTable } from '@/components/ui/data-table';
import { getTrainingRoutesColumns } from '@/hooks/students/info/trainingRoute/trainingRoutes.columns';
import { trainingRoutesMock } from '@/hooks/students/info/trainingRoute/trainingRoutes.mock';
import { TrainingRoute } from '@/hooks/students/info/trainingRoute/trainingRoutes.types';

export function TrainingRoutesTable({
  onSelect,
  selectedRouteId,
}: {
  onSelect: (route: TrainingRoute) => void;
  selectedRouteId?: string;
}) {
  return (
    <div
      className="
        [&_.data-table-search]:hidden
        [&_.data-table-filters]:hidden
        [&_.data-table-pagination]:hidden
    
    w-[748px] h-[341px] flex flex-col"
    >
      <DataTable columns={getTrainingRoutesColumns(onSelect, selectedRouteId)} data={trainingRoutesMock} />
    </div>
  );
}
