import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, Trash, Edit, Trash2 } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

import { ControlledDataTable, type ControlledDatatableProps } from '@/components/datatables/datatable'
import { usePagination } from '@/hooks/use-pagination'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useCustomersSorting } from '@/features/users/hooks/use-customers-sorting'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
import { dateToMediumFormat } from '@/lib/dates/date-to-medium-format'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import { Link, useSearchParams } from 'react-router-dom'
import { customerQueryOptions } from '../query-options'

type Customer = {
    id: number
    first_name: string
    last_name: string
    email: string
    created_at: string
}

const columns: ColumnDef<Customer>[] = [
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
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link to={`/customers/${row.original.id}/edit`}>
                        <DropdownMenuItem className='cursor-pointer'>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <Trash className='mr-2 h-4 w-4' />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

const useSearchFromSearchParam = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search') || ''

    const setSearch = (search: string) => {
        setSearchParams(oldParams => {
            const newParams = new URLSearchParams(oldParams)
            newParams.set('search', search)
            return newParams
        })
    }

    const clearSearch = () => {
        setSearchParams(oldParams => {
            const newParams = new URLSearchParams(oldParams)
            newParams.delete('search')
            return newParams
        })
    }

    return { search, setSearch, clearSearch }
}

export const CustomersDatatable = () => {
    const { t } = useTranslation()

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

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

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
                        isOpen={isDeleteDialogOpen}
                        setIsOpen={setIsDeleteDialogOpen}
                        button={
                            <Button
                                variant='destructive'
                                size='sm'
                                disabled={selectedRows.length === 0}
                                onClick={() => {
                                    setIsDeleteDialogOpen(true)
                                }}
                            >
                                <Trash2 className='mr-2 size-4' />
                                {t('Delete Selected')}
                            </Button>
                        }
                        onConfirm={() => {
                            console.log('Delete', selectedRows)
                            setIsDeleteDialogOpen(false)
                        }}
                    />

                    <Link to='/customers/create'>
                        <Button size='sm'>{t('Add Customer')}</Button>
                    </Link>
                </div>
            </div>

            <ControlledDataTable<Customer> {...dataTableProps} />
        </div>
    )
}
