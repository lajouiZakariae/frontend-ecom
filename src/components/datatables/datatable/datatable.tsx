import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

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
import { getPaginationLinksObjects } from '@/lib/get-object-pagination-links';

export interface SortOptions<TData> {
    sortBy: keyof TData;
    order: 'asc' | 'desc';
}

export interface DatatableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    onRowSelectedChange: (rowSelection: RowSelectionState) => void;
    page: number;
    pageCount: number;
    onPageChange?: (page: number) => void;
    sorting: SortingState;
    setSorting: Dispatch<SetStateAction<SortingState>>;
}

export const DataTable = <TData,>(dataTableProps: DatatableProps<TData>) => {
    const {
        columns,
        data,
        onRowSelectedChange,
        page,
        pageCount,
        onPageChange,
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
        manualPagination: true,
        manualSorting: true,
        enableMultiSort: true,
    });

    useEffect(() => {
        onRowSelectedChange?.(rowSelection);
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

    const paginationLinksObjects = getPaginationLinksObjects(
        pagination.pageIndex + 1,
        8
    );

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

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    {Object.keys(rowSelection).length} of{' '}
                    {table.getPreFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div>
                    <Pagination>
                        <PaginationContent>
                            {/* Previous Button */}
                            <PaginationPrevious>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span className="sr-only">
                                        Go to previous page
                                    </span>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </PaginationPrevious>

                            {/* Pagination Links */}
                            {paginationLinksObjects.map((linkObj, index) => (
                                <PaginationItem key={index}>
                                    {linkObj.isSeperator ? (
                                        <PaginationEllipsis className="bg-opacity-60">
                                            {linkObj.link}
                                        </PaginationEllipsis>
                                    ) : (
                                        <PaginationLink>
                                            <Button
                                                variant={
                                                    linkObj.active
                                                        ? 'default'
                                                        : 'ghost'
                                                }
                                                className="h-8 w-8 p-0"
                                                onClick={() =>
                                                    table.setPageIndex(
                                                        Number(linkObj.link) - 1
                                                    )
                                                }
                                            >
                                                {linkObj.link}
                                            </Button>
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}

                            {/* Next Button */}
                            <PaginationNext>
                                <Button
                                    variant="outline"
                                    className="h-8 w-8 p-0"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span className="sr-only">
                                        Go to next page
                                    </span>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </PaginationNext>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </>
    );
};