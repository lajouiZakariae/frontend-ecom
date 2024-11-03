import { Outlet, RouteObject } from 'react-router-dom'
import LoginView from './views/login-view.tsx'
import UsersView from './views/users-view.tsx'
import { Dashboard } from './layouts/dashboard/dashboard.tsx'
import FormView from './views/form-view.tsx'
import { Guest } from './features/auth/components/guest.tsx'
import { Auth } from './features/auth/components/auth.tsx'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <Auth>
                <Dashboard>
                    <Outlet />
                </Dashboard>
            </Auth>
        ),
        children: [
            {
                path: '/users',
                Component: UsersView,
            },
            {
                path: '/users/create',
                Component: FormView,
            },
        ],
    },
    {
        path: '/login',
        element: (
            <Guest>
                <LoginView />
            </Guest>
        ),
    },
]
