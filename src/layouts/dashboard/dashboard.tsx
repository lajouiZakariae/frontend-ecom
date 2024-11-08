import { FC, PropsWithChildren, ReactNode } from 'react'
import { useToogleIsSidebarOpen } from '@/layouts/dashboard/hooks/use-toogle-is-sidebar-open'
import { useIsSidebarOpen } from '@/layouts/dashboard/hooks/use-is-sidebar-open'
import DefaultHeader from './header'
import DefaultSidebar from './sidebar'
import { cn } from '@/lib/utils'

interface DashboardProps extends PropsWithChildren {
    header?: ReactNode
    sidebar?: ReactNode
}

const Dashboard: FC<DashboardProps> = ({ children, header, sidebar }) => {
    const isSidebarOpen = useIsSidebarOpen()
    const toggleSidebar = useToogleIsSidebarOpen()

    return (
        <div
            className={cn('vertical full main-section font-nunito relative text-sm font-normal antialiased', {
                'close-sidebar': !isSidebarOpen,
            })}
        >
            {/* BEGIN MAIN CONTAINER */}
            <div className='relative'>
                {/* sidebar menu overlay */}
                <div
                    className={cn('fixed inset-0 z-50 bg-[black]/60 lg:hidden', {
                        hidden: isSidebarOpen,
                    })}
                    onClick={toggleSidebar}
                ></div>
                {/* screen loader */}

                <div className='min-h-screen text-black'>
                    <aside
                        className={cn(
                            'fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] transition-all duration-300',
                            isSidebarOpen
                                ? 'ltr:-left-[260px] lg:ltr:left-0 rtl:-right-[260px] lg:rtl:right-0'
                                : 'ltr:left-0 lg:ltr:-left-[260px] rtl:right-0 lg:rtl:-right-[260px]',
                        )}
                    >
                        {sidebar ?? <DefaultSidebar />}
                    </aside>

                    <div
                        className={cn(
                            'flex min-h-screen flex-col transition-all duration-300',
                            isSidebarOpen ? 'lg:ltr:ml-[260px] lg:rtl:mr-[260px]' : 'ltr:ml-0 rtl:mr-0',
                        )}
                    >
                        <header className='z-40 shadow-sm'>{header ?? <DefaultHeader />}</header>

                        {/* CONTENT AREA */}
                        <div className='p-6'>{children}</div>
                        {/* CONTENT AREA */}

                        <div className='mt-auto p-6 pt-0 text-center ltr:sm:text-left rtl:sm:text-right'>
                            &copy; {new Date().getFullYear()}.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
