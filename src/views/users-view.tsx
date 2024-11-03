import { ColumnDef, SortingState } from '@tanstack/react-table'

import { MoreHorizontal, Trash, Edit, Trash2 } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

import { DataTable, DatatableProps } from '@/components/datatables/datatable'
import { usePagination } from '@/hooks/use-pagination'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserService } from '@/features/users/service'
import { useTranslation } from 'react-i18next'
import { MultiSelectDropdownFilter } from '@/components/filters/multi-select-dropdown-filter'

type User = {
    id: number
    first_name: string
    last_name: string
    email: string
}

const data: User[] = [
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
    {
        id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
    },
    {
        id: 3,
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob@example.com',
    },
]

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        id: 'id',
    },
    {
        accessorFn: row => `${row.first_name} ${row.last_name}`,
        header: 'Full Name',
        id: 'full_name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
        id: 'email',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const person = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => console.log('Edit', person)}>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete', person)}>
                            <Trash className='mr-2 h-4 w-4' />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

const UsersView = () => {
    const { t } = useTranslation()

    const { page, setPage } = usePagination()

    const [sorting, setSorting] = useState<SortingState>([])

    const sortBy = sorting.at(0)?.id

    const order = sorting.at(0)?.desc ? 'desc' : 'asc'

    const usersQuery = useQuery({
        queryKey: ['users', { page, sortBy, order }],
        queryFn: async () =>
            await UserService.getPaginatedAndFilteredUsers({
                page,
                sortBy,
                order,
            }),
    })

    const [selectedRows, setSelectedRows] = useState<number[]>([])

    const dataTableProps: DatatableProps<User> = {
        columns,
        data: usersQuery.data?.data || data,
        isError: usersQuery.isError,
        isFetching: usersQuery.isLoading,
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

    const statusOptions = [
        { label: 'Active', value: 'active' },
        { label: 'Banned', value: 'banned' },
    ]

    const [selectedOptions, setSelectedOptions] = useState<typeof statusOptions>([])

    return (
        <div className='w-full'>
            <div className='mb-4 flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <MultiSelectDropdownFilter
                        options={statusOptions}
                        title={t('Status')}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                    />
                </div>

                <Button variant='destructive' size='sm' disabled={selectedRows.length === 0}>
                    <Trash2 className='mr-2 h-4 w-4' />
                    Delete Selected
                </Button>
            </div>
            <DataTable<User> {...dataTableProps} />
        </div>
    )
}

export default UsersView
