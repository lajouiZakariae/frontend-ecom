import { UserForm } from '@/features/users/components/user-form'
import { withFormik } from 'formik'
import { UserFormValues } from '../types/user-form-values'

export interface UserFormWithFormikProps {
    initialValues: UserFormValues
    submitHandler: (values: UserFormValues) => void
}

export const UserFormWithFormik = withFormik<UserFormWithFormikProps, UserFormValues>({
    mapPropsToValues: values => ({
        first_name: values.initialValues.first_name ?? '',
        last_name: values.initialValues.last_name ?? '',
        email: values.initialValues.email ?? '',
        password: values.initialValues.password ?? '',
        password_confirmation: values.initialValues.password_confirmation ?? '',
    }),
    // validationSchema: yup.object({
    //     first_name: yup.string().required('First Name is required'),
    //     last_name: yup.string().required('Last Name is required'),
    //     email: yup.string().email('Email is invalid').required('Email is required'),
    //     password: yup.string().required('Password is required'),
    //     password_confirmation: yup
    //         .string()
    //         .oneOf([yup.ref('password')], 'Passwords do not match')
    //         .required('Password Confirmation is required'),
    // }),
    handleSubmit: (values, { props }) => props.submitHandler(values),
})(UserForm)
