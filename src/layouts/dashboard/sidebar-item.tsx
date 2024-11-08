import { FC, SVGProps } from 'react'
import { NavLink, To } from 'react-router-dom'

interface SidebarItemProps {
    text: string
    to: To
    active: boolean
    Icon: FC<SVGProps<SVGSVGElement>>
}

export const SidebarItem = ({ text, to, active, Icon }: SidebarItemProps) => {
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
