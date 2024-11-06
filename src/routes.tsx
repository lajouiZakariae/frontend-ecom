import { Outlet, RouteObject } from 'react-router-dom'
import LoginView from './views/login-view.tsx'
import { Dashboard } from './layouts/dashboard/dashboard.tsx'
import { Guest } from './features/auth/components/guest.tsx'
import { Auth } from './features/auth/components/auth.tsx'
import CreateCustomerView from './views/customers/create-customer-view.tsx'
import CustomersView from './views/customers/customers-view.tsx'
import UpdateCustomerView from './views/customers/update-customer-view.tsx'
import CategoriesView from './views/categories/categories-view.tsx'
import CreateCategoryView from './views/categories/create-category-view.tsx'
import UpdateCategoryView from './views/categories/update-category-view.tsx'

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
                children: [
                    {
                        index: true,
                        Component: CustomersView,
                    },
                    {
                        path: 'create',
                        Component: CreateCustomerView,
                    },
                    {
                        path: ':customerId/edit',
                        Component: UpdateCustomerView,
                    },
                ],
            },
            {
                path: 'categories',
                children: [
                    {
                        index: true,
                        Component: CategoriesView,
                    },
                    {
                        path: 'create',
                        Component: CreateCategoryView,
                    },
                    {
                        path: ':categoryId/edit',
                        Component: UpdateCategoryView,
                    },
                ],
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
