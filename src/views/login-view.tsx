import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthApi } from '@/features/auth/api/auth-service'
import { useSetUserData } from '@/features/auth/hooks/use-set-user-data'
import { Credentials, LoginForm } from '@/features/login/components/login-form'
import { GoogleIcon } from '@/icons/google-icon'
import { TokenStorageService } from '@/lib/token-storage-serve'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const LoginView = () => {
    const { t } = useTranslation()

    const setUserData = useSetUserData()

    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: async (credentials: Credentials) => await AuthApi.login(credentials),
        onSuccess: data => {
            const userData = data.data

            const userToken = data.meta.token

            TokenStorageService.saveToken(userToken)

            setUserData(userData)

            navigate('/')
        },
    })

    const formik = useFormik<Credentials>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            return await loginMutation.mutateAsync(values)
        },
    })

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-bold'>{t('Login')}</CardTitle>
                </CardHeader>

                <CardContent>
                    <LoginForm {...formik} />

                    <div className='space-y-4'>
                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center'>
                                <span className='w-full border-t' />
                            </div>

                            <div className='relative flex justify-center text-xs uppercase'>
                                <span className='bg-background px-2 text-muted-foreground'>
                                    {t('Or continue with')}
                                </span>
                            </div>
                        </div>

                        <Button variant='outline' className='w-full'>
                            <GoogleIcon className='mr-2 h-4 w-4' />
                            {t('Continue with Google')}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginView
