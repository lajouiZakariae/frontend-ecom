import { TextFieldGroup } from '@/components/form-fields/text-field-group'
import { Button } from '@/components/ui/button'
import { Form, FormikContextType, FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'

export interface Credentials {
    email: string
    password: string
}

export interface LoginFormProps extends FormikContextType<Credentials> {}

export const LoginForm = (formik: LoginFormProps) => {
    const { t } = useTranslation()

    return (
        <FormikProvider value={formik}>
            <Form className='mb-4 space-y-4'>
                <TextFieldGroup label={t('Email')} name='email' placeholder={t('Enter your email')} />

                <TextFieldGroup
                    label={t('Password')}
                    name='password'
                    type='password'
                    placeholder={t('Enter your password')}
                />

                <Button className='w-full' type='submit' disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? t('Logging in...') : t('Login')}
                </Button>
            </Form>
        </FormikProvider>
    )
}
