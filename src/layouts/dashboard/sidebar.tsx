import { useToogleIsSidebarOpen } from '@/layouts/dashboard/hooks/use-toogle-is-sidebar-open'
import { useIsSidebarOpen } from '@/layouts/dashboard/hooks/use-is-sidebar-open'
import { MenuIcon } from '@/icons/menu-icon'

import PerfectScrollbar from 'react-perfect-scrollbar'
import { FC, SVGProps, useEffect, useState } from 'react'
import { NavLink, To } from 'react-router-dom'
import AnimateHeight from 'react-animate-height'
import { IconCaretDown } from '@/icons/icon-caret-down'
import { MinusIcon, User2Icon } from 'lucide-react'

interface SidebarItemProps {
    text: string
    to: To
    active: boolean
    Icon: FC<SVGProps<SVGSVGElement>>
}

const SidebarItem = ({ text, to, active, Icon }: SidebarItemProps) => {
    return (
        <li className='menu nav-item'>
            <NavLink to={to} className='group'>
                <div className='flex items-center'>
                    <Icon className='shrink-0 group-hover:!text-primary' />
                    <span className='dark:group-hover:text-white-dark text-black dark:text-[#506690] ltr:pl-3 rtl:pr-3'>
                        {text}
                    </span>
                </div>
            </NavLink>
        </li>
    )
}

interface SidebarItemWithDropDownProps {
    text: string
    Icon: FC<SVGProps<SVGSVGElement>>
    childrenRoutes: { text: string; to: To; active?: boolean }[]
}

const SidebarItemWithDropDownProps = ({ text, Icon, childrenRoutes }: SidebarItemWithDropDownProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const isSidebarItemActive = childrenRoutes.some(route => route.active)

    return (
        <li className='menu nav-item'>
            <button
                type='button'
                className={`${isSidebarItemActive ? 'active' : ''} nav-link group w-full`}
                onClick={() => setIsOpen(isOpen => !isOpen)}
            >
                <div className='flex items-center'>
                    <Icon className='shrink-0 group-hover:!text-primary' />
                    <span className='dark:group-hover:text-white-dark text-black dark:text-[#506690] ltr:pl-3 rtl:pr-3'>
                        {text}
                    </span>
                </div>

                <div className={!isSidebarItemActive ? '-rotate-90 rtl:rotate-90' : ''}>
                    <IconCaretDown />
                </div>
            </button>

            <AnimateHeight duration={300} height={isOpen ? 'auto' : 0}>
                <ul className='sub-menu text-gray-500'>
                    {childrenRoutes.map(route => (
                        <li>
                            <NavLink to={route.to}>{route.text}</NavLink>
                        </li>
                    ))}
                </ul>
            </AnimateHeight>
        </li>
    )
}

const Sidebar = () => {
    const isSidebarOpen = useIsSidebarOpen()
    const toggleSidebar = useToogleIsSidebarOpen()

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
                        text='Dashboard'
                        Icon={User2Icon}
                        childrenRoutes={[
                            { text: 'User', to: '/dashboard/user', active: true },
                            { text: 'Admin', to: '/dashboard/admin' },
                        ]}
                    />
                    <SidebarItemWithDropDownProps
                        text='Dashboard'
                        Icon={User2Icon}
                        childrenRoutes={[
                            { text: 'User', to: '/dashboard/user' },
                            { text: 'Admin', to: '/dashboard/admin' },
                        ]}
                    />
                </ul>
            </PerfectScrollbar>
        </div>
    )
}

export default Sidebar
