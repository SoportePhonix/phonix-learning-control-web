import { CustomColumnDef } from '@/components/ui/data-table';
import clsx from 'clsx';

import { Course } from './courses.mock';

export const courseColumns: CustomColumnDef<Course>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'name',
    header: 'Nombre del curso',
  },
  {
    accessorKey: 'infoRoutes',
    header: 'Rutas de información',
  },
  {
    accessorKey: 'students',
    header: 'Estudiantes',
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
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.original.status;

      const styles =
        status === 'Activo'
          ? {
              backgroundColor: '#3BB273',
              color: '#F6F9FB',
            }
          : {
              backgroundColor: '#D4514E',
              color: '#F6F9FB',
            };

      return (
        <span
          style={{
            ...styles,
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 500,
            display: 'inline-block',
            textAlign: 'center',
            minWidth: '80px',
          }}
        >
          {status}
        </span>
      );
    },
  },
];
