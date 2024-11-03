import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LoadingCustomerForm } from '@/features/customers/components/loading-customer-form'
import { UpdateCustomerForm } from '@/features/customers/components/update-customer-form'
import { customerQueryOptions } from '@/features/customers/query-options'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

const UpdateCustomerView = () => {
    const { t } = useTranslation()

    const { customerId } = useParams()

    const customerUserQuery = useQuery(customerQueryOptions.findById(Number(customerId)))

    return (
        <div className='mx-auto max-w-2xl'>
            <div className='mb-1 flex items-center space-x-1 text-neutral-800'>
                <Link to={'/users'} className='text-neutral-500 hover:text-neutral-900'>
                    <Button variant={'ghost'} size={'icon'}>
                        <ArrowLeft />
                    </Button>
                </Link>

                <h1 className='text-lg font-bold'>{t('New User')}</h1>
            </div>

            <Card className='w-full p-4'>
                {customerUserQuery.isPending ? (
                    <LoadingCustomerForm />
                ) : (
                    <UpdateCustomerForm customer={customerUserQuery.data.data} />
                )}
            </Card>
        </div>
    )
}

export default UpdateCustomerView
