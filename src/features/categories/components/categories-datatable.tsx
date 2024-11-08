import { ColumnDef } from '@tanstack/react-table'
import { Trash, Edit } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ControlledDataTable, type ControlledDatatableProps } from '@/components/datatables/datatable'
import { usePagination } from '@/hooks/use-pagination'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCategoriesSorting } from '@/features/categories/hooks/use-categories-sorting'
import { dateToMediumFormat } from '@/lib/dates/date-to-medium-format'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { categoryQueryOptions } from '../query-options'
import { useSearchFromSearchParam } from '@/hooks/use-search-from-search-param'
import { Category } from '../types'
import { ActionsDropdown } from '@/components/actions-dropdown'
import { DeleteManyCategoriesDialog } from './dialogs/delete-many-categories-dialog'
import { DeleteCategoryDialog } from './dialogs/delete-category-dialog'
import { useQuery } from '@tanstack/react-query'
import { InlineSearchForm } from '@/components/inline-search-form'
import { ImageCell } from '@/components/image-cell'

export const CategoriesDatatable = () => {
    const { t } = useTranslation()

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

    const columns = useMemo<ColumnDef<Category>[]>(
        () => [
            {
                id: 'image',
                accessorKey: 'image',
                header: t('Image'),
                enableSorting: false,
                cell: ({ row }) => {
                    return (
                        <ImageCell
                            src={row.original.image ? row.original.image.url : '/placeholder.png'}
                            alt={row.original.name}
                            size={60}
                        />
                    )
                },
            },
            {
                accessorKey: 'name',
                header: t('Name'),
                id: 'name',
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
                            <Link to={`/categories/${row.original.id}/edit`}>
                                <DropdownMenuItem className='cursor-pointer'>
                                    <Edit className='mr-2 h-4 w-4' />
                                    {t('Edit')}
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem
                                className='cursor-pointer'
                                onClick={() => {
                                    setIsDeleteDialogOpen(true)
                                    setSelectedCategoryId(row.original.id)
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

    const { sorting, setSorting } = useCategoriesSorting()

    const sortBy = sorting.at(0)?.id

    const order = sorting.at(0)?.desc ? 'desc' : 'asc'

    const { search, setSearch, clearSearch } = useSearchFromSearchParam()

    const usersQuery = useQuery(categoryQueryOptions.filtered({ page, sortBy, order, search }))

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

    const dataTableProps: ControlledDatatableProps<Category> = {
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
                    <DeleteManyCategoriesDialog selectedRows={selectedRows} onSuccess={() => setSelectedRows([])} />

                    <Link to='/categories/create'>
                        <Button size='sm'>{t('Add Category')}</Button>
                    </Link>
                </div>
            </div>

            <ControlledDataTable<Category> {...dataTableProps} />

            <DeleteCategoryDialog id={selectedCategoryId} setId={setSelectedCategoryId} />
        </div>
    )
}
