import { Form, FormikContextType, FormikProvider } from 'formik'
import { Button } from '@/components/ui/button'
import { TextFieldGroup } from '@/components/form-fields/text-field-group'
import { UserFormValues } from '../types/user-form-values'

interface UserFormProps extends FormikContextType<UserFormValues> {
    actionTitle: string
}

export const UserForm = ({ actionTitle, ...formik }: UserFormProps) => (
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
                {actionTitle}
            </Button>
        </Form>
    </FormikProvider>
)
