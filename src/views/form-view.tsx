import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormikProvider, useFormik } from 'formik'
import * as yup from 'yup'
import { TextFieldGroup } from '../components/form-fields/text-field-group'

interface UserFormValues {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
}

const UserForm = () => {
    const formik = useFormik<UserFormValues>({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: yup.object({
            first_name: yup.string().required('First Name is required'),
            last_name: yup.string().required('Last Name is required'),
            email: yup.string().email('Email is invalid').required('Email is required'),
            password: yup.string().required('Password is required'),
            password_confirmation: yup
                .string()
                .oneOf([yup.ref('password')], 'Passwords do not match')
                .required('Password Confirmation is required'),
        }),
        onSubmit: values => {
            console.log(values)
        },
    })

    return (
        <FormikProvider value={formik}>
            <Form className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <TextFieldGroup label='First Name' name='first_name' />

                    <TextFieldGroup label='Last Name' name='last_name' />
                </div>

                <TextFieldGroup label='Email' name='email' />

                <TextFieldGroup label='Password' name='password' type='password' />

                <TextFieldGroup type='password' label='Password Confirmation' name='password_confirmation' />

                <Button type='submit' className='w-full'>
                    Create User
                </Button>
            </Form>
        </FormikProvider>
    )
}

const CreateForm = () => {
    return <UserForm />
}

const FormView = () => {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-bold'>Create New User</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default FormView
