import { UserForm } from '@/features/users/components/user-form'
import { customerQueryKeys } from '@/features/users/query-options'
import { CustomerService } from '@/features/users/service'
import { Customer, UserFormValues } from '@/features/users/types'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface UpdateUserFormProps {
    customer: Customer
}

export const UpdateUserForm: FC<UpdateUserFormProps> = ({ customer }) => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const updateCustomerMutation = useMutation<unknown, Error, UserFormValues>({
        mutationFn: async values => await CustomerService.updateCustomer(customer.id, values),
        meta: {
            invalidates: [customerQueryKeys.all()],
        },
        onSuccess: () => {
            navigate('/customers')
        },
    })

    const formik = useFormik<UserFormValues>({
        initialValues: {
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            password: '',
            password_confirmation: '',
        },
        onSubmit: async values => await updateCustomerMutation.mutateAsync(values),
    })

    return <UserForm actionTitle={formik.isSubmitting ? t('Creating User...') : t('Create User')} {...formik} />
}
