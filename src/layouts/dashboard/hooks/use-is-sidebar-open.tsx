import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useIsSidebarOpen = () => useSelector<RootState>(state => state.siteSettings.isSidebarOpen)
