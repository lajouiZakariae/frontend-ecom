import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
    ColumnDef,
    getCoreRowModel,
    PaginationState,
    SortingState,
    TableOptions,
    useReactTable,
} from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

export interface SortOptions<TData> {
    sortBy: keyof TData
    order: 'asc' | 'desc'
}

export interface UseControlledDatatableOptions<TData> {
    columns: ColumnDef<TData>[]
    data: TData[]
    onRowSelectedChange: (rowSelection: string[]) => void
    page: number
    pageCount: number
    sorting: SortingState
    setSorting: Dispatch<SetStateAction<SortingState>>
    getRowId: TableOptions<TData>['getRowId']
    onPageChange?: (page: number) => void
}

export const useControlledDatatable = <TData,>(dataTableProps: UseControlledDatatableOptions<TData>) => {
    const { columns, data, onRowSelectedChange, page, pageCount, onPageChange, getRowId, sorting, setSorting } =
        dataTableProps

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
        [columns],
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

    return {
        columns: columnsWithMultiSelect,
        table,
        pagination,
        sorting,
        paginationInputValue,
        setPaginationInputValue,
        applyPagination,
    }
}
