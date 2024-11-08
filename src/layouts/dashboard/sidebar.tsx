import { useToogleIsSidebarOpen } from '@/layouts/dashboard/hooks/use-toogle-is-sidebar-open'
import { useIsSidebarOpen } from '@/layouts/dashboard/hooks/use-is-sidebar-open'
import { MenuIcon } from '@/icons/menu-icon'

import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEffect, useState } from 'react'
import { BoxIcon, MinusIcon, User2Icon } from 'lucide-react'
import { SidebarItemWithDropDownProps } from './sidebar-item-with-dropdown'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
    const isSidebarOpen = useIsSidebarOpen()

    const toggleSidebar = useToogleIsSidebarOpen()

    const { t } = useTranslation()

    const { pathname } = useLocation()

    const [currentActiveMenu, setCurrentActiveMenu] = useState<null | string>(null)

    const toggleActiveMenu = (menu: string) =>
        currentActiveMenu === menu ? setCurrentActiveMenu(null) : setCurrentActiveMenu(menu)

    useEffect(() => {
        if (window.innerWidth < 1024 && !isSidebarOpen) {
            toggleSidebar()
        }
    }, [])

    return (
        <div className='h-full bg-white shadow-[5px_0_25px_0_rgba(94,92,154,0.1)]'>
            <div className='flex items-center justify-between px-4 py-3'>
                <a href='/' className='flex shrink-0 items-center'>
                    <img className='ml-[5px] w-8 flex-none' src='/vite.svg' alt='logo' />
                    <span className='align-middle text-2xl font-semibold lg:inline ltr:ml-1.5 rtl:mr-1.5'>
                        {import.meta.env.VITE_APP_NAME}
                    </span>
                </a>

                <button
                    type='button'
                    className='flex size-8 items-center rounded-full transition duration-300 rtl:rotate-180'
                    onClick={toggleSidebar}
                >
                    <MenuIcon className='size-6 text-gray-600' />
                </button>
            </div>

            <PerfectScrollbar className='relative h-[calc(100vh-80px)]'>
                <ul className='relative space-y-0.5 p-4 py-0 font-semibold'>
                    <h2 className='dark:bg-dark -mx-4 mb-1 flex items-center bg-[#e0e6ed]/30 px-7 py-3 font-extrabold uppercase dark:bg-opacity-[0.08]'>
                        <MinusIcon className='hidden h-5 w-4 flex-none' />
                        <span>{'app'}</span>
                    </h2>

                    <SidebarItemWithDropDownProps
                        id='customers'
                        text={t('Customers')}
                        Icon={User2Icon}
                        currentActiveMenu={currentActiveMenu}
                        toggleActiveMenu={toggleActiveMenu}
                        childrenRoutes={[
                            { text: 'List', to: '/customers', active: pathname === '/customers' },
                            { text: 'Create', to: '/customers/create', active: pathname === '/customers/create' },
                        ]}
                    />

                    <SidebarItemWithDropDownProps
                        id='categories'
                        text={t('Categories')}
                        Icon={BoxIcon}
                        currentActiveMenu={currentActiveMenu}
                        toggleActiveMenu={toggleActiveMenu}
                        childrenRoutes={[
                            { text: 'List', to: '/categories', active: pathname === '/categories' },
                            { text: 'Create', to: '/categories/create', active: pathname === '/categories/create' },
                        ]}
                    />
                </ul>
            </PerfectScrollbar>
        </div>
    )
}

export default Sidebar
