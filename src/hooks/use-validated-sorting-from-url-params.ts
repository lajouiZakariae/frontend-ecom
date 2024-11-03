import { useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'

interface GetValidatedSortingFromURLParamsOptions {
    allowedSortByList: string[]
    defaultOrder: 'asc' | 'desc'
    defaultSortBy: string
    values: { sortBy: string; order: string }
}

const getValidatedSortingFromURLParams = ({
    allowedSortByList,
    defaultOrder,
    defaultSortBy,
    values: { sortBy, order },
}: GetValidatedSortingFromURLParamsOptions) => {
    try {
        const validated = Yup.object({
            sortBy: Yup.string().oneOf(allowedSortByList).required(),
            order: Yup.string().oneOf([undefined, 'asc', 'desc']).required(),
        }).validateSync(
            {
                sortBy,
                order,
            },
            { abortEarly: false },
        )

        return {
            sortBy: validated.sortBy,
            order: validated.order,
        }
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            const fieldsWichHasError = error.inner.map(e => e.path)

            return {
                sortBy: fieldsWichHasError.includes('sortBy') ? defaultSortBy : sortBy,
                order: fieldsWichHasError.includes('order') ? defaultOrder : order,
            }
        }

        return {
            sortBy: defaultSortBy,
            order: defaultOrder,
        }
    }
}

type UseValidatedFiltersFromURLParamsOptions = Omit<GetValidatedSortingFromURLParamsOptions, 'values'>

export const useValidatedSortingFromURLParams = ({
    allowedSortByList,
    defaultOrder,
    defaultSortBy,
}: UseValidatedFiltersFromURLParamsOptions) => {
    const [searchParams, setSearhParams] = useSearchParams()

    const validated = getValidatedSortingFromURLParams({
        allowedSortByList,
        defaultOrder,
        defaultSortBy,
        values: {
            sortBy: searchParams.get('sortBy') ?? defaultSortBy,
            order: searchParams.get('order') ?? defaultOrder,
        },
    })

    const setSortingToSearchParams = (sortBy: string, order: string) => {
        setSearhParams(oldSearchParams => {
            oldSearchParams.set('sortBy', sortBy)
            oldSearchParams.set('order', order)
            return oldSearchParams
        })
    }

    const clearSortingFromSearchParams = () => {
        setSearhParams(oldSearchParams => {
            oldSearchParams.delete('sortBy')
            oldSearchParams.delete('order')
            return oldSearchParams
        })
    }

    return { values: validated, setSortingToSearchParams, clearSortingFromSearchParams }
}
