import { useDispatch } from 'react-redux'
import { setUser } from '../store'

export const useSetUserData = () => {
    const dispatch = useDispatch()

    return (data: Record<'string', unknown>) => {
        dispatch(setUser(data ? { ...data } : null))

        return data
    }
}
