import { IconCaretDown } from '@/icons/icon-caret-down'
import { FC, SVGProps, useEffect } from 'react'
import AnimateHeight from 'react-animate-height'
import { Link, To } from 'react-router-dom'

interface SidebarItemWithDropDownProps {
    id: string
    text: string
    Icon: FC<SVGProps<SVGSVGElement>>
    currentActiveMenu: string | null
    toggleActiveMenu: (menu: string) => void
    childrenRoutes: { text: string; to: To; active?: boolean }[]
}

export const SidebarItemWithDropDownProps = ({
    id,
    text,
    Icon,
    childrenRoutes,
    currentActiveMenu,
    toggleActiveMenu,
}: SidebarItemWithDropDownProps) => {
    useEffect(() => {
        const isSidebarItemActive = childrenRoutes.some(route => route.active)

        if (isSidebarItemActive) {
            toggleActiveMenu(id)
        }
    }, [])

    return (
        <li className='menu nav-item'>
            <button
                type='button'
                className={`${currentActiveMenu === id ? 'active' : ''} nav-link group w-full`}
                onClick={() => toggleActiveMenu(id)}
            >
                <div className='flex items-center'>
                    <Icon className='shrink-0 group-hover:!text-primary' />
                    <span className='dark:group-hover:text-white-dark text-black dark:text-[#506690] ltr:pl-3 rtl:pr-3'>
                        {text}
                    </span>
                </div>

                <div className={currentActiveMenu !== id ? '-rotate-90 rtl:rotate-90' : ''}>
                    <IconCaretDown />
                </div>
            </button>

            <AnimateHeight duration={300} height={currentActiveMenu === id ? 'auto' : 0}>
                <ul className='sub-menu text-gray-500'>
                    {childrenRoutes.map(route => (
                        <li>
                            <Link to={route.to} className={route.active ? 'active' : ''}>
                                {route.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </AnimateHeight>
        </li>
    )
}
