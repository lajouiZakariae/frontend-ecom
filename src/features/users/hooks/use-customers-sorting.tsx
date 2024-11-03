import { useValidatedSortingFromURLParams } from '@/hooks/use-validated-sorting-from-url-params'
import { SortingState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

export const useCustomersSorting = () => {
    const {
        values: validatedSortBy,
        setSortingToSearchParams,
        clearSortingFromSearchParams,
    } = useValidatedSortingFromURLParams({
        allowedSortByList: ['first_name', 'last_name', 'email'],
        defaultSortBy: 'created_at',
        defaultOrder: 'desc',
    })

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: validatedSortBy.sortBy,
            desc: validatedSortBy.order === 'desc',
        },
    ])

    useEffect(() => {
        if (sorting[0]) {
            setSortingToSearchParams(sorting[0].id, sorting[0].desc ? 'desc' : 'asc')
        } else {
            clearSortingFromSearchParams()
        }
    }, [sorting])

    return { sorting, setSorting }
}
