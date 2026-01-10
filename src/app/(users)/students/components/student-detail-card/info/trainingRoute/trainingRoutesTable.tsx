'use client';

import { getTrainingRoutesColumns } from '@/app/(users)/students/hooks/info/trainingRoute/trainingRoutes.columns';
import { trainingRoutesMock } from '@/app/(users)/students/hooks/info/trainingRoute/trainingRoutes.mock';
import { TrainingRoute } from '@/app/(users)/students/hooks/info/trainingRoute/trainingRoutes.types';
import { DataTable } from '@/components/ui/data-table';

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
        [&_.data-table-pagination]:hiddenflex flex-col"
    >
      <DataTable columns={getTrainingRoutesColumns(onSelect, selectedRouteId)} data={trainingRoutesMock} />
    </div>
  );
}
