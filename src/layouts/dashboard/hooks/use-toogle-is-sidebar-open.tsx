import { toggleSidebar } from '@/store/site-settings'
import { useDispatch } from 'react-redux'

export const useToogleIsSidebarOpen = () => {
    const dispatch = useDispatch()
    return () => dispatch(toggleSidebar())
}
