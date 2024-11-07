import { useToogleIsSidebarOpen } from '@/layouts/dashboard/hooks/use-toogle-is-sidebar-open'
import { useIsSidebarOpen } from '@/layouts/dashboard/hooks/use-is-sidebar-open'
import { MenuIcon } from '@/icons/menu-icon'

import PerfectScrollbar from 'react-perfect-scrollbar'
import { FC, ReactNode, SVGProps, useEffect, useState } from 'react'
import { NavLink, To } from 'react-router-dom'
import AnimateHeight from 'react-animate-height'
import { IconMenuDashboard } from '@/icons/icon-menu-dashboard'
import { IconCaretDown } from '@/icons/icon-caret-down'
import { cn } from '@/lib/utils'
import { User2Icon } from 'lucide-react'

interface SidebarItemProps {
    text: string
    to: To
    active: boolean
    icon: ReactNode
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
    // return (
    // <li>
    //     <button
    //         type='button'
    //         className={cn(
    //             'group mb-1 flex w-full items-center justify-between overflow-hidden whitespace-nowrap rounded-md p-2.5 text-[#506690] hover:bg-[#000]/[0.08] hover:text-black dark:hover:bg-[#181f32] dark:hover:text-[#e0e6ed]',
    //             {
    //                 'bg-[#000]/[0.08] text-black dark:bg-[#181f32] dark:text-[#e0e6ed]': isSidebarItemActive,
    //             },
    //         )}
    //         onClick={() => setIsOpen(isOpen => !isOpen)}
    //     >
    //         <div className='flex items-center'>
    //             <Icon className='size-5 shrink-0 text-black/50 group-hover:!text-[#4361ee] dark:text-white/50' />

    //             <span
    //                 className={cn(
    //                     'text-black dark:text-[#506690] dark:group-hover:text-[#e0e6ed] ltr:pl-3 rtl:pr-3',
    //                     {
    //                         'dark:!text-[#e0e6ed]': isSidebarItemActive,
    //                     },
    //                 )}
    //             >
    //                 {text}
    //             </span>
    //         </div>

    //         <div className={cn('-rotate-90 rtl:rotate-90')}>
    //             <IconCaretDown />
    //         </div>
    //     </button>

    //     <AnimateHeight duration={300} height={isOpen ? 'auto' : 0}>
    //         <ul className='sub-menu text-gray-500'>
    //             {childrenRoutes.map(route => (
    //                 <li key={route.text}>
    //                     <NavLink
    //                         to={route.to}
    //                         className={cn(
    //                             'flex w-full items-center px-9 py-2.5 before:h-0.5 before:w-2 before:rounded before:bg-gray-300 hover:bg-gray-100 hover:text-[#4361ee] hover:before:!bg-[#4361ee] dark:before:bg-gray-500 dark:hover:bg-gray-900 dark:hover:text-[#4361ee] ltr:before:mr-2 rtl:before:ml-2',
    //                             {
    //                                 'text-[#4361ee] before:bg-[#4361ee]': route.active ?? false,
    //                             },
    //                         )}
    //                     >
    //                         {route.text}
    //                     </NavLink>
    //                 </li>
    //             ))}
    //         </ul>
    //     </AnimateHeight>
    // </li>
    // )
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
                    <SidebarItemWithDropDownProps
                        text='Dashboard'
                        Icon={User2Icon}
                        childrenRoutes={[
                            { text: 'User', to: '/dashboard/user', active: true },
                            { text: 'Admin', to: '/dashboard/admin' },
                        ]}
                    />
                </ul>
            </PerfectScrollbar>
        </div>
    )
}

export default Sidebar
