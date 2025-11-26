import { Skeleton } from '@/components/ui/skeleton';
import { Column } from '@tanstack/react-table';

import { TableCell, TableRow } from '../../table';

export const SkeletonRow = <TData,>({ visibleColumns }: { visibleColumns: Column<TData, unknown>[] }) => (
  <TableRow>
    {visibleColumns.map((column, index) => (
      <TableCell key={column.id || index} className="py-5">
        <Skeleton className="h-3 w-3/4 rounded bg-white/70" />
      </TableCell>
    ))}
  </TableRow>
);
