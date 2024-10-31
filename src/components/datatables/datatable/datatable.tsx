import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    SortingState,
    TableOptions,
    useReactTable,
} from '@tanstack/react-table';

import { PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface SortOptions<TData> {
    sortBy: keyof TData;
    order: 'asc' | 'desc';
}

export interface DatatableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    onRowSelectedChange: (rowSelection: string[]) => void;
    page: number;
    pageCount: number;
    onPageChange?: (page: number) => void;
    sorting: SortingState;
    setSorting: Dispatch<SetStateAction<SortingState>>;
    getRowId: TableOptions<TData>['getRowId'];
}

export const DataTable = <TData,>(dataTableProps: DatatableProps<TData>) => {
    const {
        columns,
        data,
        onRowSelectedChange,
        page,
        pageCount,
        onPageChange,
        getRowId,
    } = dataTableProps;

    const columnsWithMultiSelect = useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={value =>
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={value => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            ...columns,
        ],
        []
    );

    const [rowSelection, setRowSelection] = useState({});

    const [sorting, setSorting] = useState<SortingState>([]);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: page,
        pageSize: pageCount,
    });

    const table = useReactTable({
        data,
        columns: columnsWithMultiSelect,
        pageCount,
        state: {
            rowSelection,
            sorting,
            pagination,
        },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getRowId: getRowId,
        manualPagination: true,
        manualSorting: true,
        enableMultiSort: true,
    });

    useEffect(() => {
        onRowSelectedChange?.(
            Object.entries(rowSelection)
                .filter(([, value]) => value === true)
                .map(([key]) => key)
        );
    }, [rowSelection]);

    useEffect(() => {
        onPageChange?.(pagination.pageIndex + 1);
    }, [pagination.pageIndex]);

    const renderSortingIcon = (sortintState: 'asc' | 'desc' | false) => {
        if (sortintState === false) {
            return <ArrowUpDown className="size-4" />;
        }

        return {
            asc: <ArrowDown className="size-4" />,
            desc: <ArrowUp className="size-4" />,
        }[sortintState];
    };

    const [paginationInputValue, setPaginationInputValue] = useState('');

    const applyPagination = (page: number) => {
        const pageCount = table.getPageCount();

        if (page < 0) {
            setPaginationInputValue('1');
            setPagination(prev => ({
                ...prev,
                pageIndex: 1,
            }));
        } else if (page >= pageCount) {
            setPaginationInputValue(String(pageCount));
            setPagination(prev => ({
                ...prev,
                pageIndex: pageCount,
            }));
        } else {
            setPagination(prev => ({
                ...prev,
                pageIndex: page,
            }));
        }
    };

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.id === 'select' ? (
                                            header.isPlaceholder ? null : (
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )
                                            )
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                                {header.column.getCanSort()
                                                    ? renderSortingIcon(
                                                          header.column.getIsSorted()
                                                      )
                                                    : null}
                                            </Button>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                    <PaginationPrevious>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </PaginationPrevious>

                    <span className="text-sm font-medium">
                        Page {pagination.pageIndex} of {table.getPageCount()}
                    </span>

                    <PaginationNext>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </PaginationNext>
                </div>
                <div className="flex items-center space-x-2">
                    <Input
                        type="number"
                        placeholder="Page"
                        value={paginationInputValue}
                        onChange={e => setPaginationInputValue(e.target.value)}
                        className="w-20"
                        min={1}
                        max={table.getPageCount()}
                    />
                    <Button
                        onClick={() =>
                            applyPagination(Number(paginationInputValue) - 1)
                        }
                    >
                        Go
                    </Button>
                </div>
            </div>
        </>
    );
};
