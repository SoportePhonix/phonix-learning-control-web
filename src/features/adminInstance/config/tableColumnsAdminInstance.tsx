'use client';

import { AlertConfirmDialogDestructive } from '@/components/AlertConfirmDialogDestructive';
import { Button } from '@/components/ui/button';
import { AdminInstance } from '@/lib/services/api/adminInstanceApi/interface';
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';

import { useDeleteAdminInstance } from '../hooks/useDeleteAdminInstance';

export const tableColumnsAdminInstance = (
  t: (key: any) => string,
  currentUserId?: number
): ColumnDef<AdminInstance>[] => [
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: 'instanceId',
    header: 'Instance ID',
  },
  {
    accessorKey: 'createdAt',
    header: t('c.createdAt') || 'Created At',
    cell: ({ row }) => (
      <span>{row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : '-'}</span>
    ),
  },
  {
    id: 'actions',
    header: t('a.actions') || 'Actions',
    cell: ({ row }) => {
      const { deleteAdminInstance, isLoading } = useDeleteAdminInstance();

      const handleDelete = async () => {
        await deleteAdminInstance({
          userId: row.original.userId,
          instanceId: row.original.instanceId,
        });
      };

      return (
        <div className="flex gap-2 justify-center">
          <Button variant="ghost" size="icon" disabled={isLoading} onClick={handleDelete}>
            <Trash className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      );
    },
  },
];
