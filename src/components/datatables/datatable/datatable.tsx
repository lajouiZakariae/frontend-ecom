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
    AlertCircle,
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Loader,
    Loader2,
    Loader2Icon,
    LoaderCircle,
    LoaderIcon,
    LoaderPinwheel,
    LocateFixed,
    LucideLoader,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const SpinnerIcon = ({ ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.05em"
        height="1em"
        viewBox="0 0 25 24"
        {...props}
    >
        <path
            fill="currentColor"
            d="M4.818 6.664h-.001a1.847 1.847 0 1 1 1.306-.541a1.77 1.77 0 0 1-1.277.541h-.029zm-2.97 7.182h-.001a1.847 1.847 0 1 1 1.306-.541a1.77 1.77 0 0 1-1.278.541h-.031h.002zM12 3.692a1.847 1.847 0 1 1 1.306-.541a1.77 1.77 0 0 1-1.277.541zM4.818 21.029h-.001a1.847 1.847 0 1 1 1.306-.541a1.77 1.77 0 0 1-1.276.541h-.031zM19.182 7.125a2.308 2.308 0 1 1 0-4.615a2.308 2.308 0 0 1 0 4.615M12 24a1.847 1.847 0 1 1 1.306-.541a1.77 1.77 0 0 1-1.277.541zm10.154-9.231h-.048c-.75 0-1.428-.309-1.913-.807l-.001-.001c-.499-.503-.808-1.196-.808-1.961s.308-1.458.808-1.962a2.66 2.66 0 0 1 1.914-.808h.05h-.003h.048c.75 0 1.427.309 1.913.807l.001.001c.499.503.808 1.196.808 1.961s-.308 1.458-.808 1.962a2.66 2.66 0 0 1-1.915.809h-.049zm-2.971 7.643h-.05a3.1 3.1 0 0 1-2.236-.951l-.001-.001c-.584-.584-.945-1.391-.945-2.283s.361-1.698.945-2.283a3.1 3.1 0 0 1 2.234-.945h.054h-.003h.042c.877 0 1.67.362 2.237.944l.001.001c.588.582.952 1.39.952 2.283s-.364 1.7-.952 2.282a3.1 3.1 0 0 1-2.24.953h-.04z"
        />
    </svg>
);

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
    sorting: SortingState;
    setSorting: Dispatch<SetStateAction<SortingState>>;
    getRowId: TableOptions<TData>['getRowId'];
    onPageChange?: (page: number) => void;
    isFetching?: boolean;
    isError?: boolean;
}

const ErrorMessage = ({ message }: { message: string }) => (
    <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
    </Alert>
);

export const DataTable = <TData,>(dataTableProps: DatatableProps<TData>) => {
    const {
        columns,
        data,
        onRowSelectedChange,
        page,
        pageCount,
        onPageChange,
        getRowId,
        isFetching = false,
        isError = false,
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

                    <TableBody className="">
                        {isError ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columnsWithMultiSelect.length}
                                    className="p-4"
                                >
                                    <ErrorMessage
                                        message={'Failed to load the data'}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : isFetching ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columnsWithMultiSelect.length}
                                >
                                    <div className="w-full min-h-80 flex justify-center items-center ">
                                        <SpinnerIcon className="animate-spin h-8 w-8 m-auto" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
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
