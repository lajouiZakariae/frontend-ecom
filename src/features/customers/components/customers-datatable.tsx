import { ColumnDef } from '@tanstack/react-table'
import { Trash, Edit } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ControlledDataTable, type ControlledDatatableProps } from '@/components/datatables/datatable'
import { usePagination } from '@/hooks/use-pagination'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomersSorting } from '@/features/customers/hooks/use-customers-sorting'
import { dateToMediumFormat } from '@/lib/dates/date-to-medium-format'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { customerQueryOptions } from '../query-options'
import { useSearchFromSearchParam } from '@/hooks/use-search-from-search-param'
import { Customer } from '../types'
import { ActionsDropdown } from '@/components/actions-dropdown'
import { DeleteManyCustomersDialog } from './dialogs/delete-many-customers-dialog'
import { DeleteCustomerDialog } from './dialogs/delete-customer-dialog'
import { useQuery } from '@tanstack/react-query'
import { InlineSearchForm } from '@/components/inline-search-form'

export const CustomersDatatable = () => {
    const { t } = useTranslation()

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

    const columns: ColumnDef<Customer>[] = useMemo(
        () => [
            {
                accessorKey: 'first_name',
                header: t('First name'),
                id: 'first_name',
            },
            {
                accessorKey: 'last_name',
                header: t('Last name'),
                id: 'last_name',
            },
            {
                accessorKey: 'email',
                header: t('Email'),
                id: 'email',
            },
            {
                accessorKey: 'created_at',
                header: t('Date created'),
                id: 'created_at',
                cell: ({ row }) => dateToMediumFormat(new Date(row.original.created_at)),
            },
            {
                id: 'actions',
                cell: ({ row }) => {
                    return (
                        <ActionsDropdown>
                            <Link to={`/customers/${row.original.id}/edit`}>
                                <DropdownMenuItem className='cursor-pointer'>
                                    <Edit className='mr-2 h-4 w-4' />
                                    {t('Edit')}
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem
                                className='cursor-pointer'
                                onClick={() => {
                                    setIsDeleteDialogOpen(true)
                                    setSelectedCustomerId(row.original.id)
                                }}
                            >
                                <Trash className='mr-2 size-4' />
                                {t('Delete')}
                            </DropdownMenuItem>
                        </ActionsDropdown>
                    )
                },
            },
        ],
        [isDeleteDialogOpen],
    )

    const { page, setPage } = usePagination()

    const { sorting, setSorting } = useCustomersSorting()

    const sortBy = sorting.at(0)?.id

    const order = sorting.at(0)?.desc ? 'desc' : 'asc'

    const { search, setSearch, clearSearch } = useSearchFromSearchParam()

    const usersQuery = useQuery(customerQueryOptions.filtered({ page, sortBy, order, search }))

    const [selectedRows, setSelectedRows] = useState<number[]>([])

    const searchForm = useFormik({
        initialValues: { search },
        onSubmit: values => {
            setSearch(values.search)
        },
    })

    useEffect(() => {
        if (searchForm.values.search === '') {
            clearSearch()
        }
    }, [searchForm.values.search])

    const dataTableProps: ControlledDatatableProps<Customer> = {
        columns,
        data: usersQuery.data?.data || [],
        isError: usersQuery.isError,
        isFetching: usersQuery.isLoading,
        noResultsMessage: t('No users found'),
        sorting,
        setSorting,
        page,
        pageCount: usersQuery.data?.meta.last_page || 1,
        getRowId: row => row.id.toString(),
        onPageChange: setPage,
        onRowSelectedChange: selectedRows => {
            setSelectedRows(selectedRows.map(Number))
        },
    }

    return (
        <div className='w-full rounded-md bg-white p-4 shadow-lg'>
            <div className='mb-4 flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <InlineSearchForm {...searchForm} />
                </div>

                <div className='flex items-center space-x-1'>
                    <DeleteManyCustomersDialog selectedRows={selectedRows} onSuccess={() => setSelectedRows([])} />

                    <Link to='/customers/create'>
                        <Button size='sm'>{t('Add Customer')}</Button>
                    </Link>
                </div>
            </div>

            <ControlledDataTable<Customer> {...dataTableProps} />

            <DeleteCustomerDialog id={selectedCustomerId} setId={setSelectedCustomerId} />
        </div>
    )
}
