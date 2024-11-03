import { useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'

interface UseValidatedFiltersFromURLParamsOptions {
    allowedSortByList: string[]
    defaultOrder: 'asc' | 'desc'
    defaultSortBy: string
}

export const useValidatedSortingFromURLParams = ({
    allowedSortByList,
    defaultOrder,
    defaultSortBy,
}: UseValidatedFiltersFromURLParamsOptions) => {
    const [searchParams] = useSearchParams()

    const valuesFromURLParams = {
        sortBy: searchParams.get('sortBy') ?? defaultSortBy,
        order: searchParams.get('order') ?? defaultOrder,
    }

    try {
        const validated = Yup.object({
            sortBy: Yup.string().oneOf(allowedSortByList).required(),
            order: Yup.string().oneOf([undefined, 'asc', 'desc']).required(),
        }).validateSync(valuesFromURLParams, { abortEarly: false })

        return {
            sortBy: validated.sortBy,
            order: validated.order,
        }
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            const fieldsWichHasError = error.inner.map(e => e.path)

            return {
                sortBy: fieldsWichHasError.includes('sortBy') ? defaultSortBy : valuesFromURLParams.sortBy,
                order: fieldsWichHasError.includes('order') ? defaultOrder : valuesFromURLParams.order,
            }
        }

        return {
            sortBy: defaultSortBy,
            order: defaultOrder,
        }
    }
}
