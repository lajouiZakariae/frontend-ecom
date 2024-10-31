import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import LoginView from './views/login-view.tsx';
import store from './store/index.tsx';
import { Provider } from 'react-redux';
import UsersView from './views/users-view.tsx';
import { Dashboard } from './layouts/dashboard/dashboard.tsx';
import { AuthenticationInitializer } from './features/auth/components/init-auth.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client.ts';
import FormView from './views/form-view.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Dashboard>
                <Outlet />
            </Dashboard>
        ),
        children: [
            {
                path: '/users',
                Component: UsersView,
            },
            {
                path: '/form',
                Component: FormView,
            },
        ],
    },
    {
        path: '/login',
        Component: LoginView,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AuthenticationInitializer>
                    <RouterProvider router={router} />
                </AuthenticationInitializer>
            </Provider>
        </QueryClientProvider>
    </StrictMode>
);
