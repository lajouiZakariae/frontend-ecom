import { ColumnDef } from '@tanstack/react-table'

import { Trash, Edit, Trash2 } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

import { ControlledDataTable, type ControlledDatatableProps } from '@/components/datatables/datatable'
import { usePagination } from '@/hooks/use-pagination'
import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useCustomersSorting } from '@/features/customers/hooks/use-customers-sorting'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
import { dateToMediumFormat } from '@/lib/dates/date-to-medium-format'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { customerQueryKeys, customerQueryOptions } from '../query-options'
import { useSearchFromSearchParam } from '@/hooks/use-search-from-search-param'
import { CustomerService } from '../service'
import { Customer } from '../types'
import { ActionsDropdown } from './actions-dropdown'

export const CustomersDatatable = () => {
    const { t } = useTranslation()

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

    const columns: ColumnDef<Customer>[] = useMemo(
        () => [
            {
                accessorKey: 'first_name',
                header: 'First Name',
                id: 'first_name',
            },
            {
                accessorKey: 'last_name',
                header: 'Last Name',
                id: 'last_name',
            },
            {
                accessorKey: 'email',
                header: 'Email',
                id: 'email',
            },
            {
                accessorKey: 'created_at',
                header: 'Date Created',
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

    const [isDeleteManyDialogOpen, setIsDeleteManyDialogOpen] = useState(false)

    const searchForm = useFormik({
        initialValues: { search },
        onSubmit: values => {
            setSearch(values.search)
        },
    })

    const deleteCustomerMutation = useMutation({
        mutationFn: CustomerService.deleteById,
        meta: {
            invalidates: [customerQueryKeys.all()],
        },
    })

    const deleteManyCustomerMutation = useMutation({
        mutationFn: CustomerService.deleteMany,
        meta: {
            invalidates: [customerQueryKeys.all()],
        },
    })

    useEffect(() => {
        if (searchForm.values.search === '') {
            clearSearch()
        }
    }, [searchForm.values.search])

    return (
        <div className='w-full rounded-md bg-white p-4 shadow-lg'>
            <div className='mb-4 flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <form className='flex items-center space-x-2' onSubmit={searchForm.handleSubmit}>
                        <Input placeholder='Search' {...searchForm.getFieldProps('search')} />

                        <Button type='submit' disabled={searchForm.values.search === ''}>
                            {t('Seach')}
                        </Button>
                    </form>
                </div>

                <div className='flex items-center space-x-1'>
                    <ConfirmDeleteDialog
                        isOpen={isDeleteManyDialogOpen}
                        setIsOpen={setIsDeleteManyDialogOpen}
                        button={
                            <Button
                                variant='destructive'
                                size='sm'
                                disabled={selectedRows.length === 0}
                                onClick={() => {
                                    setIsDeleteManyDialogOpen(true)
                                }}
                            >
                                <Trash2 className='mr-2 size-4' />
                                {t('Delete Selected')}
                            </Button>
                        }
                        onConfirm={async () => {
                            await deleteManyCustomerMutation.mutateAsync(selectedRows)

                            setSelectedRows([])

                            setIsDeleteManyDialogOpen(false)
                        }}
                    />

                    <Link to='/customers/create'>
                        <Button size='sm'>{t('Add Customer')}</Button>
                    </Link>
                </div>
            </div>

            <ControlledDataTable<Customer> {...dataTableProps} />

            <ConfirmDeleteDialog
                isOpen={isDeleteDialogOpen}
                setIsOpen={open => {
                    if (open === false) setSelectedCustomerId(null)
                    setIsDeleteDialogOpen(open)
                }}
                button={undefined}
                onConfirm={async () => {
                    if (selectedCustomerId) {
                        await deleteCustomerMutation.mutateAsync(selectedCustomerId)
                    }

                    setSelectedCustomerId(null)

                    setIsDeleteDialogOpen(false)
                }}
            />
        </div>
    )
}
