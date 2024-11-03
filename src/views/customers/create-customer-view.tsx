import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreateCustomerForm } from '@/features/customers/components/create-customer-form'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CreateCustomerView = () => {
    const { t } = useTranslation()

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
                <CreateCustomerForm />
            </Card>
        </div>
    )
}

export default CreateCustomerView
