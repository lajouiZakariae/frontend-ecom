import { useSearchParams } from 'react-router-dom'

export const useSearchFromSearchParam = () => {
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
