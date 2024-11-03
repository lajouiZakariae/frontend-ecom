import { UserForm } from '@/features/users/components/user-form'
import { customerQueryKeys } from '@/features/users/query-options'
import { CustomerService } from '@/features/users/service'
import { UserFormValues } from '@/features/users/types/user-form-values'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const CreateUserForm = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const createCustomerMutation = useMutation({
        mutationFn: CustomerService.createCustomer,
        meta: {
            invalidates: [customerQueryKeys.all()],
        },
        onSuccess: () => {
            navigate('/customers')
        },
    })

    const formik = useFormik<UserFormValues>({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        onSubmit: async values => await createCustomerMutation.mutateAsync(values),
    })

    return <UserForm actionTitle={formik.isSubmitting ? t('Creating User...') : t('Create User')} {...formik} />
}
