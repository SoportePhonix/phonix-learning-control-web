import { CircularProgressSmall } from '@/components/student-detail-card/info/circularProgressSmall';
import { ColumnDef } from '@tanstack/react-table';

import { TrainingRoute } from './trainingRoutes.types';

export const trainingRoutesColumns: ColumnDef<TrainingRoute>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const isFirst = row.index === 0;

      return (
        <span className={`font-medium ${isFirst ? 'text-[#0A66C2]' : 'text-[#3A484C]'}`}>{row.original.name}</span>
      );
    },
  },
  {
    accessorKey: 'courses',
    header: 'Cursos',
    cell: ({ row }) => <span className="text-[#3A484C]">{row.original.courses}</span>,
  },
  {
    accessorKey: 'progress',
    header: 'Progreso',
    cell: ({ row }) => <CircularProgressSmall value={row.original.progress} />,
  },
];
