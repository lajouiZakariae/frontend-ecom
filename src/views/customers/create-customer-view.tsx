import { BackLink } from '@/components/back-link'
import { Card } from '@/components/ui/card'
import { CreateCustomerForm } from '@/features/customers/components/forms/create-customer-form'
import { useTranslation } from 'react-i18next'

const CreateCustomerView = () => {
    const { t } = useTranslation()

    return (
        <div className='mx-auto max-w-2xl'>
            <div className='mb-1 flex items-center space-x-1 text-neutral-800'>
                <BackLink to='/customers' />

                <h1 className='text-lg font-bold'>
                    {t('New {{resource}}', {
                        resource: t('Customer'),
                    })}
                </h1>
            </div>

            <Card className='w-full p-4'>
                <CreateCustomerForm />
            </Card>
        </div>
    )
}

export default CreateCustomerView
