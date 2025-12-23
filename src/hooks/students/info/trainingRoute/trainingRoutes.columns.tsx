import { CircularProgressSmall } from '@/components/student-detail-card/info/circularProgressSmall';
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
          className={`
            w-full text-left font-medium px-2 py-1 rounded
            transition-colors
            ${isSelected ? 'bg-[#0B262E] text-white' : 'text-[#3A484C] hover:bg-[rgba(11,38,46,0.08)]'}
          `}
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
