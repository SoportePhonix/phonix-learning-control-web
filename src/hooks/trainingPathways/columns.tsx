import { Button } from '@/components/ui';
import { CustomColumnDef } from '@/components/ui/data-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';

import { TrainingPathway } from './trainingPathways.mock';

export const trainingPathwaysColumns: CustomColumnDef<TrainingPathway>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'company',
    header: 'Empresa',
  },
  {
    accessorKey: 'area',
    header: 'Área',
  },
  {
    accessorKey: 'role',
    header: 'Cargo',
  },
  {
    accessorKey: 'courses',
    header: 'Cursos',
  },
  {
    accessorKey: 'students',
    header: 'Estudiantes',
  },
  {
    id: 'actions',
    header: 'Detalle',
    cell: ({ row }) => {
      const student = row.original;

      return (
        <Link href={'/trainingPathways/info'}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              console.log('Detalle estudiante:', student);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
