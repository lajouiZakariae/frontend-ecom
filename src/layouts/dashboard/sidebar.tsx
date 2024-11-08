import { useToogleIsSidebarOpen } from '@/layouts/dashboard/hooks/use-toogle-is-sidebar-open'
import { useIsSidebarOpen } from '@/layouts/dashboard/hooks/use-is-sidebar-open'
import { MenuIcon } from '@/icons/menu-icon'

import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEffect, useState } from 'react'
import { BoxIcon, User2Icon } from 'lucide-react'
import { SidebarItemWithDropDownProps } from './sidebar-item-with-dropdown'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from './section-title'

const Sidebar = () => {
    const isSidebarOpen = useIsSidebarOpen()

    const toggleSidebar = useToogleIsSidebarOpen()

    const { t } = useTranslation()

    const { pathname } = useLocation()

    const [currentActiveMenu, setCurrentActiveMenu] = useState<null | string>('customers')

    const toggleActiveMenu = (menu: string) =>
        currentActiveMenu === menu ? setCurrentActiveMenu(null) : setCurrentActiveMenu(menu)

    useEffect(() => {
        if (window.innerWidth < 1024 && !isSidebarOpen) {
            toggleSidebar()
        }
    }, [])

    return (
        <div className='h-full bg-white shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] dark:bg-slate-950'>
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
                    <MenuIcon className='size-6 text-gray-600 transition-colors hover:text-primary dark:text-white' />
                </button>
            </div>

            <PerfectScrollbar className='relative h-[calc(100vh-80px)]'>
                <ul className='relative space-y-0.5 p-4 py-0 pt-3 font-semibold'>
                    <SectionTitle className='mb-2'>{t('management')}</SectionTitle>

                    <SidebarItemWithDropDownProps
                        id='customers'
                        text={t('Customers')}
                        Icon={User2Icon}
                        currentActiveMenu={currentActiveMenu}
                        toggleActiveMenu={toggleActiveMenu}
                        childrenRoutes={[
                            { text: t('List'), to: '/customers', active: pathname === '/customers' },
                            { text: t('Create'), to: '/customers/create', active: pathname === '/customers/create' },
                        ]}
                    />

                    <SidebarItemWithDropDownProps
                        id='categories'
                        text={t('Categories')}
                        Icon={BoxIcon}
                        currentActiveMenu={currentActiveMenu}
                        toggleActiveMenu={toggleActiveMenu}
                        childrenRoutes={[
                            { text: t('List'), to: '/categories', active: pathname === '/categories' },
                            { text: t('Create'), to: '/categories/create', active: pathname === '/categories/create' },
                        ]}
                    />
                </ul>
            </PerfectScrollbar>
        </div>
    )
}

export default Sidebar
