import { useToogleIsSidebarOpen } from '@/layouts/dashboard/hooks/use-toogle-is-sidebar-open'
import { cn } from '@/lib/utils'
import { useIsSidebarOpen } from './hooks/use-is-sidebar-open'
import { MenuIcon } from '@/icons/menu-icon'
import { UserHeaderDropdown } from './user-header-dropdown'

const Header = () => {
    const toggleSidebar = useToogleIsSidebarOpen()
    const isSidebarOpen = useIsSidebarOpen()

    return (
        <div className='flex min-h-[56px] w-full items-center bg-white px-5 py-2.5'>
            <div
                className={cn('flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2', {
                    'lg:flex': !isSidebarOpen,
                })}
            >
                <a href='/' className='flex shrink-0 items-center'>
                    <img className='inline w-8 ltr:-ml-1 rtl:-mr-1' src='/vite.svg' alt='logo' />

                    <span className='hidden align-middle text-2xl font-semibold transition-all duration-300 md:inline ltr:ml-1.5 rtl:mr-1.5'>
                        {import.meta.env.VITE_APP_NAME}
                    </span>
                </a>
                <button
                    type='button'
                    className={cn(
                        'bg-white-light/40 hover:bg-white-light/90 flex flex-none rounded-full p-2 hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2',
                        {
                            'lg:flex': !isSidebarOpen,
                        },
                    )}
                    onClick={toggleSidebar}
                >
                    <MenuIcon className='size-6 text-gray-600' />
                </button>
            </div>

            <div className='ml-auto'>
                <UserHeaderDropdown />
            </div>
        </div>
    )
}

export default Header
