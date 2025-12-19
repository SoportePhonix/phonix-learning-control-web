import React, { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ColumnDef,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, CircleX, MoveDown } from 'lucide-react';

import { SkeletonRow } from './components/skeletonRow';
import TableRows from './components/tableRows';
import { SearchIcon } from './icon/search';

export type CustomColumnDef<TData> = ColumnDef<TData> & {
  canHide?: boolean;
  defaultHidden?: boolean;
  accessorKey?: string;
};

export type DataTableProps<TData> = {
  data: TData[];
  columns: CustomColumnDef<TData>[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  currentPage?: number;
  totalPages?: number;
  totalResults?: number;
  isLoading?: boolean;
};

export function DataTable<TData>({
  data,
  columns,
  onPageChange,
  onPageSizeChange,
  currentPage,
  totalPages,
  totalResults,
  isLoading,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    const initialVisibility: VisibilityState = {};
    columns.forEach((column) => {
      const columnId = column.id || column.accessorKey;
      if (columnId) {
        initialVisibility[columnId] = column.defaultHidden ? false : true;
      }
    });
    return initialVisibility;
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const isPaginatedFromApi = typeof onPageChange === 'function' && typeof currentPage === 'number';

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      pagination,
    },
    manualPagination: isPaginatedFromApi,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: isPaginatedFromApi ? undefined : setPagination,
  });

  const [visiblePages, setVisiblePages] = useState(10);
  const [sizePageValue, setSizePageValue] = useState(10);

  useEffect(() => {
    const updateVisiblePages = () => {
      setVisiblePages(window.innerWidth < 768 ? 5 : 10);
    };

    updateVisiblePages();

    window.addEventListener('resize', updateVisiblePages);
    return () => window.removeEventListener('resize', updateVisiblePages);
  }, []);

  const handlePageSizeChange = (size: number) => {
    if (isPaginatedFromApi && onPageSizeChange) {
      onPageSizeChange(size);
      setSizePageValue(size);
    } else {
      table.setPageSize(size);
    }
  };

  const [previousPage, setPreviousPage] = useState<number>(currentPage || 1);
  const [previousTotalResults, setPreviousTotalResults] = useState<number>(totalResults || data.length);
  const [previousStartResult, setPreviousStartResult] = useState<number>(0);
  const [previousEndResult, setPreviousEndResult] = useState<number>(0);

  const effectiveCurrentPage = currentPage ?? previousPage;
  const effectiveTotalPages = totalPages ?? Math.ceil(data.length / pagination.pageSize);

  const currentPageIndex = table.getState().pagination.pageIndex;
  const totalPagesValue = isPaginatedFromApi ? effectiveTotalPages : table.getPageCount();
  const currentPageValue = isPaginatedFromApi ? effectiveCurrentPage - 1 : currentPageIndex;

  const pageNumbers = useMemo(() => {
    if (totalPagesValue <= visiblePages) {
      return Array.from({ length: totalPagesValue }, (_, i) => i);
    }

    if (currentPageValue < visiblePages - 2) {
      return [...Array.from({ length: visiblePages - 2 }, (_, i) => i), '...', totalPagesValue - 1];
    }

    if (currentPageValue >= totalPagesValue - (visiblePages - 2)) {
      return [
        0,
        '...',
        ...Array.from({ length: visiblePages - 2 }, (_, i) => totalPagesValue - (visiblePages - 2) + i),
      ];
    }

    return [
      0,
      '...',
      ...Array.from({ length: visiblePages - 4 }, (_, i) => currentPageValue - Math.floor((visiblePages - 4) / 2) + i),
      '...',
      totalPagesValue - 1,
    ];
  }, [currentPageValue, totalPagesValue, visiblePages]);

  const totalR = isPaginatedFromApi ? effectiveTotalPages * sizePageValue : data.length;
  const totalRecords = isLoading ? previousTotalResults : isPaginatedFromApi ? (totalResults ?? totalR) : data.length;

  const startResult = isLoading
    ? previousStartResult
    : isPaginatedFromApi
      ? (effectiveCurrentPage - 1) * sizePageValue + 1
      : pagination.pageIndex * pagination.pageSize + 1;

  const endResult = isLoading
    ? previousEndResult
    : Math.min(startResult + (isPaginatedFromApi ? sizePageValue : pagination.pageSize) - 1, totalRecords ?? 0);

  useEffect(() => {
    if (!isLoading) {
      setPreviousPage(currentPage || 1);
      setPreviousTotalResults(totalResults || data.length);
      setPreviousStartResult(startResult);
      setPreviousEndResult(endResult);
    }
  }, [isLoading, currentPage, totalResults, startResult, endResult, data.length]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [, setVisibleColumns] = useState<string[]>(
    table
      .getAllColumns()
      .filter((column) => column.getIsVisible())
      .map((col) => col.id)
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-5">
        <div className="relative w-full max-w-lg mr-10">
          <Input
            placeholder="Buscar..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full border border-var--white rounded-lg focus:border-var--gray_medium hover:border-var--gray_medium pr-10"
          />
          {globalFilter ? (
            <button
              onClick={() => setGlobalFilter('')}
              className="absolute top-2 right-2 transform-translate-y-1/2 h-5 w-5 text-var--primary-50 transition-transform hover:scale-110"
            >
              <CircleX className="w-5 h-5" />
            </button>
          ) : (
            <SearchIcon className="absolute top-2 right-2 transform-translate-y-1/2 h-5 w-5 text-var--primary-50" />
          )}
        </div>

        {table.getAllColumns().some((column) => (column.columnDef as CustomColumnDef<TData>).canHide ?? true) && (
          <div className="relative inline-block text-left">
            <Button
              variant="ghost"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="bg-var--white px-2 py-3 text-sm rounded-lg shadow-md shadow-var--primary-50/50 transition-colors duration-200 hover:bg-var--white font-medium text-var--primary-100"
            >
              Columnas
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            </Button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[400px] overflow-y-auto text-sm">
                <div className="py-1">
                  {table
                    .getAllColumns()
                    .filter((column) => (column.columnDef as CustomColumnDef<TData>).canHide ?? true)
                    .map((column) => (
                      <label key={column.id} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={() => {
                            column.toggleVisibility(!column.getIsVisible());
                            setVisibleColumns((prev) =>
                              column.getIsVisible() ? prev.filter((id) => id !== column.id) : [...prev, column.id]
                            );
                          }}
                          className="mr-2"
                        />
                        {typeof column.columnDef.header === 'string' ? column.columnDef.header : `Columna ${column.id}`}
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.columnDef.enableSorting ?? false;
                const isSorted = header.column.getIsSorted();

                return (
                  <TableHead
                    key={header.id}
                    className="text-left hover:bg-var--primary-50/90 bg-var--primary-50 text-var--white text-[0.9rem]"
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <div className="flex items-start justify-between px-4 py-4 w-full">
                        <button
                          className="font-semibold flex items-start gap-2 w-full"
                          onClick={() => header.column.toggleSorting(isSorted === 'asc')}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {isSorted === false && <ArrowUpDown className="w-5 h-5 opacity-20 flex-shrink-0" />}
                          {isSorted === 'desc' && <MoveDown className="w-5 h-5 flex-shrink-0" />}
                          {isSorted === 'asc' && <MoveDown className="w-5 h-5 flex-shrink-0 rotate-180" />}
                        </button>

                        {isSorted !== false && (
                          <button
                            className="text-var-gray-200 hover:underline transition-transform duration-200 hover:scale-110 flex-shrink-0"
                            onClick={() => header.column.clearSorting()}
                          >
                            <CircleX className="w-5 h-5 flex-shrink-0" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <button className="font-semibold w-full flex justify-left px-4 py-4">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </button>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading && data.length === 0 ? (
            Array.from({ length: isPaginatedFromApi ? sizePageValue : pagination.pageSize }).map((_, index) => (
              <SkeletonRow key={index} visibleColumns={table.getVisibleLeafColumns()} />
            ))
          ) : table.getRowModel().rows.length > 0 ? (
            <TableRows rows={table.getRowModel().rows} columns={columns} />
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-xl h-[32.5rem] bg-white/50">
                No existe información para mostrar
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center py-4 relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="absolute left-0 -bottom-2 tablet:bottom-8 px-2 py-3 rounded-lg shadow-md shadow-var--primary-50/50 transition-colors duration-200 data-[state=open]:bg-var--white bg-white text-var--primary-100 font-medium text-sm"
            >
              {isPaginatedFromApi ? sizePageValue : pagination.pageSize} filas
              <ChevronDown className="h-4 w-4 transition-transform duration-200 min-w-8" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="min-w-[8rem] shadow-var--primary-50/50 rounded-lg">
            {[5, 10, 20, 50, 100].map((size) => (
              <DropdownMenuCheckboxItem
                key={size}
                checked={(isPaginatedFromApi ? sizePageValue : pagination.pageSize) === size}
                onCheckedChange={() => handlePageSizeChange(size)}
                className="w-full hover:bg-gray-100 rounded-lg"
              >
                {size} filas
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (isPaginatedFromApi && onPageChange && currentPage && currentPage > 1) {
                    onPageChange(currentPage - 1);
                  } else if (!isPaginatedFromApi && table.getCanPreviousPage()) {
                    table.previousPage();
                  }
                }}
                className={
                  (isPaginatedFromApi && currentPage === 1) || (!isPaginatedFromApi && !table.getCanPreviousPage())
                    ? 'opacity-20 cursor-not-allowed'
                    : ''
                }
              />
            </PaginationItem>

            {pageNumbers.map((page, index) => (
              <PaginationItem key={index}>
                {typeof page === 'number' ? (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isPaginatedFromApi && onPageChange) {
                        onPageChange(page + 1);
                      } else {
                        table.setPageIndex(page);
                      }
                    }}
                    isActive={
                      isPaginatedFromApi
                        ? effectiveCurrentPage === page + 1
                        : table.getState().pagination.pageIndex === page
                    }
                  >
                    {page + 1}
                  </PaginationLink>
                ) : (
                  <span className="px-2">...</span>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (isPaginatedFromApi && onPageChange && currentPage && currentPage < (totalPages ?? 1)) {
                    onPageChange(currentPage + 1);
                  } else if (!isPaginatedFromApi && table.getCanNextPage()) {
                    table.nextPage();
                  }
                }}
                className={
                  (isPaginatedFromApi && currentPage === totalPages) || (!isPaginatedFromApi && !table.getCanNextPage())
                    ? 'opacity-20 cursor-not-allowed'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>

          <span className="text-base absolute right-0 bottom-0 tablet:top-8 text-var--primary-100">
            {`Resultados ${isLoading ? previousStartResult : startResult} - ${
              isLoading ? previousEndResult : endResult
            } de ${isLoading ? previousTotalResults : totalRecords}`}
          </span>
        </Pagination>
      </div>
    </div>
  );
}
