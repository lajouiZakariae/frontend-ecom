import { CustomerForm } from '@/features/customers/components/forms/customer-form'
import { customerQueryKeys } from '@/features/customers/query-options'
import { CustomerService } from '@/features/customers/service'
import { Customer, CustomerFormValues } from '@/features/customers/types'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface UpdateCustomerFormProps {
    customer: Customer
}

export const UpdateCustomerForm: FC<UpdateCustomerFormProps> = ({ customer }) => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const updateCustomerMutation = useMutation<unknown, Error, CustomerFormValues>({
        mutationFn: async values => await CustomerService.updateCustomer(customer.id, values),
        meta: {
            invalidates: [customerQueryKeys.all()],
        },
        onSuccess: () => {
            navigate('/customers')
        },
    })

    const formik = useFormik<CustomerFormValues>({
        initialValues: {
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            password: '',
            password_confirmation: '',
        },
        onSubmit: async values => await updateCustomerMutation.mutateAsync(values),
    })

    return <CustomerForm actionTitle={formik.isSubmitting ? t('Creating User...') : t('Create User')} {...formik} />
}
