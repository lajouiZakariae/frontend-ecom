import { CustomerForm } from '@/features/customers/components/forms/customer-form'
import { customerQueryKeys } from '@/features/customers/query-options'
import { CustomerService } from '@/features/customers/service'
import { CustomerFormValues } from '@/features/customers/types'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const CreateCustomerForm = () => {
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

    const formik = useFormik<CustomerFormValues>({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        onSubmit: async values => await createCustomerMutation.mutateAsync(values),
    })

    return <CustomerForm actionTitle={formik.isSubmitting ? t('Creating User...') : t('Create User')} {...formik} />
}
