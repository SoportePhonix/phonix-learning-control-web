import { TableCell, TableRow } from '@/components/ui/table';
import { ColumnDef, Row, flexRender } from '@tanstack/react-table';

interface TableRowsProps<TData> {
  rows: Row<TData>[];
  columns: ColumnDef<TData>[];
}

const TableRows = <TData,>({ rows, columns }: TableRowsProps<TData>) => {
  if (rows.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="text-center text-xl h-130 bg-base-white/50">
          No existe información para mostrar
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {rows.map((row, index) => (
        <TableRow
          key={row.id}
          className={index % 2 === 0 ? 'text-gray_medium' : 'bg-gray-200/60 text-gray_medium hover:bg-gray-200/60'}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell className="px-6 py-4 text-left" key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableRows;
