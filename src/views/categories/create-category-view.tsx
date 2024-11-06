import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreateCategoryForm } from '@/features/categories/components/forms/create-category-form'
import { useSetDocumentTitle } from '@/hooks/use-set-document-title'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CreateCategoryView = () => {
    const { t } = useTranslation()

    useSetDocumentTitle(t('New {{resource}}', { resource: t('Category') }))

    return (
        <div className='mx-auto max-w-2xl'>
            <div className='mb-1 flex items-center space-x-1 text-neutral-800'>
                <Link to={'/categories'} className='text-neutral-500 hover:text-neutral-900'>
                    <Button variant={'ghost'} size={'icon'}>
                        <ArrowLeft />
                    </Button>
                </Link>

                <h1 className='text-lg font-bold'>
                    {t('New {{resource}}', {
                        resource: t('Category'),
                    })}
                </h1>
            </div>

            <Card className='w-full p-4'>
                <CreateCategoryForm />
            </Card>
        </div>
    )
}

export default CreateCategoryView
