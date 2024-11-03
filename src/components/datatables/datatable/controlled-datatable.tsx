import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    PaginationState,
    SortingState,
    TableOptions,
    useReactTable,
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { SpinnerIcon } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'

export interface SortOptions<TData> {
    sortBy: keyof TData
    order: 'asc' | 'desc'
}

export interface ControlledDatatableProps<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
    onRowSelectedChange: (rowSelection: string[]) => void
    page: number
    pageCount: number
    sorting: SortingState
    setSorting: Dispatch<SetStateAction<SortingState>>
    getRowId: TableOptions<TData>['getRowId']
    onPageChange?: (page: number) => void
    noResultsMessage?: string
    isFetching?: boolean
    isError?: boolean
}

const ErrorMessage = ({ message }: { message: string }) => (
    <Alert variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
    </Alert>
)

export const ControlledDataTable = <TData,>(dataTableProps: ControlledDatatableProps<TData>) => {
    const {
        columns,
        data,
        onRowSelectedChange,
        page,
        pageCount,
        onPageChange,
        getRowId,
        sorting,
        setSorting,
        noResultsMessage = 'No results',
        isFetching = false,
        isError = false,
    } = dataTableProps

    const columnsWithMultiSelect = useMemo(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                        aria-label='Select all'
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={value => row.toggleSelected(!!value)}
                        aria-label='Select row'
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            ...columns,
        ],
        [],
    )

    const [rowSelection, setRowSelection] = useState({})

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: page - 1,
        pageSize: pageCount,
    })

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
    })

    useEffect(() => {
        onPageChange?.(pagination.pageIndex + 1)
    }, [pagination.pageIndex])

    useEffect(() => {
        onRowSelectedChange?.(
            Object.entries(rowSelection)
                .filter(([, value]) => value === true)
                .map(([key]) => key),
        )
    }, [rowSelection])

    const [paginationInputValue, setPaginationInputValue] = useState('')

    const applyPagination = (page: number) => {
        table.setPageIndex(page)
    }

    const renderSortingIcon = (sortintState: 'asc' | 'desc' | false) => {
        if (sortintState === false) {
            return <ArrowUpDown className='size-4' />
        }

        return {
            asc: <ArrowDown className='size-4' />,
            desc: <ArrowUp className='size-4' />,
        }[sortintState]
    }

    return (
        <>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.id === 'select' ? (
                                            header.isPlaceholder ? null : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )
                                        ) : (
                                            <Button variant='ghost' onClick={header.column.getToggleSortingHandler()}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort()
                                                    ? renderSortingIcon(header.column.getIsSorted())
                                                    : null}
                                            </Button>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {isError ? (
                            <TableRow>
                                <TableCell colSpan={columnsWithMultiSelect.length} className='p-4'>
                                    <ErrorMessage message={'Failed to load the data'} />
                                </TableCell>
                            </TableRow>
                        ) : isFetching ? (
                            <TableRow>
                                <TableCell colSpan={columnsWithMultiSelect.length}>
                                    <div className='flex min-h-80 w-full items-center justify-center'>
                                        <SpinnerIcon className='m-auto h-8 w-8 animate-spin' />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    {noResultsMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className='mt-4 flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0'>
                <div className='flex items-center space-x-2'>
                    {isFetching ? (
                        <>
                            <Button variant='outline' className='size-8 p-0' disabled>
                                <span className='sr-only'>Go to previous page</span>
                                <ChevronLeft className='size-4' />
                            </Button>

                            <span className='flex items-center text-sm font-medium'>
                                Page <Skeleton className='mx-1 inline-block h-5 w-4' /> of{' '}
                                <Skeleton className='mx-1 inline-block h-5 w-4' />
                            </span>

                            <Button variant='outline' className='size-8 p-0' disabled>
                                <span className='sr-only'>Go to next page</span>
                                <ChevronRight className='size-4' />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant='outline'
                                className='h-8 w-8 p-0'
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className='sr-only'>Go to previous page</span>
                                <ChevronLeft className='h-4 w-4' />
                            </Button>

                            <span className='text-sm font-medium'>
                                Page {pagination.pageIndex + 1} of {table.getPageCount()}
                            </span>

                            <Button
                                variant='outline'
                                className='h-8 w-8 p-0'
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className='sr-only'>Go to next page</span>
                                <ChevronRight className='h-4 w-4' />
                            </Button>
                        </>
                    )}
                </div>

                <form
                    onSubmit={ev => {
                        ev.preventDefault()
                        applyPagination(Number(paginationInputValue) - 1)
                    }}
                >
                    <div className='flex items-center space-x-2'>
                        <Input
                            type='number'
                            placeholder='Page'
                            value={paginationInputValue}
                            onChange={e => setPaginationInputValue(e.target.value)}
                            className='w-20'
                            min={1}
                            max={table.getPageCount()}
                        />

                        <Button type='submit'>Go</Button>
                    </div>
                </form>
            </div>
        </>
    )
}
