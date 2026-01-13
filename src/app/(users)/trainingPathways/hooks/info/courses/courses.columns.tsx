import { CustomColumnDef } from '@/components/ui/data-table';
import { CircleMinus, Eye } from 'lucide-react';

import { TrainingPathwayCourse } from './courses.types';

export const trainingPathwayCoursesColumns: CustomColumnDef<TrainingPathwayCourse>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'name',
    header: 'Nombre del curso',
  },
  {
    accessorKey: 'startDate',
    header: 'Fecha inicio',
  },
  {
    accessorKey: 'endDate',
    header: 'Fecha fin',
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: () => {
      return (
        <button className="rounded-md transition-colors cursor-not-allowed">
          <CircleMinus className="h-6 w-6" strokeWidth={1} />
        </button>
      );
    },
  },
];
