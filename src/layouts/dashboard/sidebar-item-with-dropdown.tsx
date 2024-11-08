import { SolidCaretDownIcon } from '@/components/icons/solid-caret-down-icon'
import { cn } from '@/lib/utils'
import { FC, SVGProps } from 'react'
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
    // useEffect(() => {
    //     const isSidebarItemActive = childrenRoutes.some(route => route.active)

    //     if (isSidebarItemActive) {
    //         toggleActiveMenu(id)
    //     }
    // }, [])

    return (
        <li>
            <button
                type='button'
                className={cn(
                    'group mb-1 flex w-full items-center justify-between overflow-hidden whitespace-nowrap rounded-md p-2.5 text-gray-500 transition hover:bg-neutral-100 hover:text-neutral-900',
                    {
                        'text-primary': currentActiveMenu === id,
                    },
                )}
                onClick={() => toggleActiveMenu(id)}
            >
                <div className='flex items-center'>
                    <Icon className={cn('size-5 shrink-0')} />

                    <span
                        className={cn(
                            'dark:group-hover:text-white-dark k transition dark:text-[#506690] ltr:pl-3 rtl:pr-3',
                            {
                                'dark:!text-[#e0e6ed]': currentActiveMenu === id,
                            },
                        )}
                    >
                        {text}
                    </span>
                </div>

                <div className={cn('', currentActiveMenu !== id ? '-rotate-90 rtl:rotate-90' : 'text-primary')}>
                    <SolidCaretDownIcon className='size-5' />
                </div>
            </button>

            <AnimateHeight duration={300} height={currentActiveMenu === id ? 'auto' : 0}>
                <ul className='sub-menu text-gray-500'>
                    {childrenRoutes.map(route => (
                        <li className='flex items-center px-2.5'>
                            <span className='relative ml-2.5 inline-block h-[44px] w-px rounded-full border-none bg-gray-300'>
                                {route.active ? (
                                    <span className='absolute right-1/2 top-1/2 size-[9px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary'></span>
                                ) : null}
                            </span>

                            <Link
                                to={route.to}
                                className={cn(
                                    'ml-3 flex w-full items-center rounded-md px-0 py-2.5 pl-3 text-gray-500 transition hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-gray-900 dark:hover:text-neutral-900',
                                    { 'bg-neutral-100 text-neutral-900 before:bg-neutral-900': route.active },
                                )}
                            >
                                {route.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </AnimateHeight>
        </li>
    )
}
