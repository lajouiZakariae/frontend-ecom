import { useDispatch } from 'react-redux'
import { clearUser } from '../store'

export const useClearUserData = () => {
    const dispatch = useDispatch()

    return () => {
        dispatch(clearUser())
    }
}
