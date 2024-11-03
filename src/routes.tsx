import { Outlet, RouteObject } from 'react-router-dom'
import LoginView from './views/login-view.tsx'
import { Dashboard } from './layouts/dashboard/dashboard.tsx'
import { Guest } from './features/auth/components/guest.tsx'
import { Auth } from './features/auth/components/auth.tsx'
import CreateCustomerView from './views/customers/create-customer-view.tsx'
import CustomersView from './views/customers/customers-view.tsx'
import UpdateCustomerView from './views/customers/update-customer-view.tsx'

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
                path: 'customers',
                Component: CustomersView,
            },
            {
                path: 'customers/create',
                Component: CreateCustomerView,
            },
            {
                path: 'customers/:customerId/edit',
                Component: UpdateCustomerView,
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
