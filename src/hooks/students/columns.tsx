import { Button } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';

import { Student } from './students.mock';

export const studentsColumns: ColumnDef<Student>[] = [
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
        <Link href={`/students/info/${student.id}`}>
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
