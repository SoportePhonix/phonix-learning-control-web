import { Button } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDownToLine, CircleMinus } from 'lucide-react';

import { RecruitmentAndSelection } from './recruitmentAndSelection.types';

export const recruitmentAndSelectionColumns: ColumnDef<RecruitmentAndSelection>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
    cell: ({ row }) => <span className="font-medium text-[#3A484C]">{row.original.code}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => <span className="text-[#3A484C]">{row.original.name}</span>,
  },
  {
    accessorKey: 'trainingRoute',
    header: 'Ruta de formación',
    cell: ({ row }) => <span className="text-[#3A484C]">{row.original.trainingRoute}</span>,
  },
  {
    accessorKey: 'startDate',
    header: 'Fecha inicio',
    cell: ({ row }) => <span className="text-[#3A484C]">{row.original.startDate}</span>,
  },
  {
    accessorKey: 'endDate',
    header: 'Fecha fin',
    cell: ({ row }) => <span className="text-[#3A484C]">{row.original.endDate}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.original.status;

      const styles =
        status === 'Completado'
          ? {
              backgroundColor: '#3BB273',
              color: '#F6F9FB',
            }
          : status === 'Iniciado'
            ? {
                backgroundColor: 'rgba(0, 188, 212, 1)',
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
            minWidth: '90px',
          }}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: 'certificate',
    header: 'Certificado',
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <div className="flex text-[14px] font-normal leading-none text-[#3A484C] pt-4 cursor-not-allowed">
            <ArrowDownToLine className="h-4 w-4" />
          </div>
        </Button>
      );
    },
  },
  {
    id: 'deregister',
    header: 'Desmatricular',
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon">
          <div className="flex text-[14px] font-normal leading-none text-[#3A484C] pt-4 cursor-not-allowed">
            <CircleMinus className="h-4 w-4" />
          </div>
        </Button>
      );
    },
  },
];
