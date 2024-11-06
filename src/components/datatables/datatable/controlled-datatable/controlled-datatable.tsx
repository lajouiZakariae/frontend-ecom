import { flexRender } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { SpinnerIcon } from '@/components/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorMessage } from '../error-message'
import { DatatableSortingIcon } from '../datatable-sorting-icon'
import { useControlledDatatable, UseControlledDatatableOptions } from './use-controlled-datatable'
import { getPaginationInfoTextDefault } from './pagination-information'

export interface ControlledDatatableProps<TData> extends UseControlledDatatableOptions<TData> {
    noResultsMessage?: string
    isFetching?: boolean
    isError?: boolean
    goToPageText?: string
    getPaginationInfoText?: (params: { page: number; totalPages: number }) => string
}

export const ControlledDataTable = <TData,>(dataTableProps: ControlledDatatableProps<TData>) => {
    const {
        getPaginationInfoText = getPaginationInfoTextDefault,
        noResultsMessage = 'No results',
        isFetching = false,
        isError = false,
        goToPageText = 'Go',
    } = dataTableProps

    const { columns, table, pagination, paginationInputValue, setPaginationInputValue, applyPagination } =
        useControlledDatatable(dataTableProps)

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
                                                {header.column.getCanSort() ? (
                                                    <DatatableSortingIcon sortintState={header.column.getIsSorted()} />
                                                ) : null}
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
                                <TableCell colSpan={columns.length} className='p-4'>
                                    <ErrorMessage message={'Failed to load the data'} />
                                </TableCell>
                            </TableRow>
                        ) : isFetching ? (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
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
                                <Skeleton className='mx-1 inline-block h-5 w-4' />
                                <Skeleton className='mx-1 inline-block h-5 w-4' />
                                <Skeleton className='mx-1 inline-block h-5 w-4' />
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
                                {getPaginationInfoText({
                                    page: pagination.pageIndex + 1,
                                    totalPages: table.getPageCount(),
                                })}
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

                        <Button type='submit'>{goToPageText}</Button>
                    </div>
                </form>
            </div>
        </>
    )
}
