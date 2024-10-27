import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect } from 'react';
import { useToogleIsSidebarOpen } from '@/layouts/dashboard/hooks/use-toogle-is-sidebar-open';
import { useIsSidebarOpen } from '@/layouts/dashboard/hooks/use-is-sidebar-open';
import { MenuIcon } from '@/icons/menu-icon';

const Sidebar = () => {
    const isSidebarOpen = useIsSidebarOpen();
    const toggleSidebar = useToogleIsSidebarOpen();

    useEffect(() => {
        if (window.innerWidth < 1024 && !isSidebarOpen) {
            toggleSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-full bg-white shadow-[5px_0_25px_0_rgba(94,92,154,0.1)]">
            <div className="flex items-center justify-between px-4 py-3">
                <a href="/" className="flex shrink-0 items-center">
                    <img
                        className="ml-[5px] w-8 flex-none"
                        src="/vite.svg"
                        alt="logo"
                    />
                    <span className="align-middle text-2xl font-semibold lg:inline ltr:ml-1.5 rtl:mr-1.5">
                        {import.meta.env.VITE_APP_NAME}
                    </span>
                </a>

                <button
                    type="button"
                    className="flex size-8 items-center rounded-full transition duration-300 rtl:rotate-180"
                    onClick={toggleSidebar}
                >
                    <MenuIcon className="size-6 text-gray-600" />
                </button>
            </div>

            <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                <ul className="relative space-y-0.5 p-4 py-0 font-semibold"></ul>
            </PerfectScrollbar>
        </div>
    );
};

export default Sidebar;
