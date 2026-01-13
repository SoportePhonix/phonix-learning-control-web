import { CircularProgressSmall } from '@/app/(users)/students/components/student-detail-card/info/circularProgressSmall';
import { ColumnDef } from '@tanstack/react-table';

import { TrainingRoute } from './trainingRoutes.types';

export const getTrainingRoutesColumns = (
  onSelect: (route: TrainingRoute) => void,
  selectedRouteId?: string
): ColumnDef<TrainingRoute>[] => [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const isSelected = row.original.id === selectedRouteId;

      return (
        <button
          title={!isSelected ? 'Selecciona una ruta' : undefined}
          onClick={() => onSelect(row.original)}
          className={`w-full text-left font-medium transition-colors no-underline 
              ${isSelected ? 'text-[#0067D7]' : 'text-[#3A484C] hover:text-[#0067D7]'}
  `}
          style={{ textDecoration: 'none' }}
        >
          {row.original.name}
        </button>
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
