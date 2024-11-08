import './index.css'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store/index.tsx'
import { Provider } from 'react-redux'
import { AuthenticationInitializer } from './features/auth/components/init-auth.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './query-client.ts'
import { routes } from './routes.tsx'
import './i18next.ts'
import { FullScreenLoader } from './components/full-screen-loader.tsx'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AuthenticationInitializer>
                    <Suspense fallback={<FullScreenLoader />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </AuthenticationInitializer>
            </Provider>
        </QueryClientProvider>
    </StrictMode>,
)
