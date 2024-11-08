import { lazy, Suspense } from 'react'
import { Outlet, type RouteObject } from 'react-router-dom'
import { Guest } from './features/auth/components/guest.tsx'
import { Auth } from './features/auth/components/auth.tsx'
import { PageLoader } from './components/page-loader.tsx'

const Dashboard = lazy(() => import('./layouts/dashboard/dashboard.tsx'))
const LoginView = lazy(() => import('./views/login-view.tsx'))
const CreateCustomerView = lazy(() => import('./views/customers/create-customer-view.tsx'))
const CustomersView = lazy(() => import('./views/customers/customers-view.tsx'))
const UpdateCustomerView = lazy(() => import('./views/customers/update-customer-view.tsx'))
const CategoriesView = lazy(() => import('./views/categories/categories-view.tsx'))
const CreateCategoryView = lazy(() => import('./views/categories/create-category-view.tsx'))
const UpdateCategoryView = lazy(() => import('./views/categories/update-category-view.tsx'))

export const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <Auth>
                <Dashboard>
                    <Suspense fallback={<PageLoader />}>
                        <Outlet />
                    </Suspense>
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
                <Outlet />
            </Guest>
        ),
        children: [
            {
                index: true,
                Component: LoginView,
            },
        ],
    },
]
