import { Button } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import { Student } from './students.mock';

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'document',
    header: 'Documento',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
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
    id: 'actions',
    header: 'Detalle',
    cell: ({ row }) => {
      const student = row.original;

      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log('Detalle estudiante:', student);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
      );
    },
  },
];
