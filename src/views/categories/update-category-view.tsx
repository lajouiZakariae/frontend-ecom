import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LoadingCategoryForm } from '@/features/categories/components/forms/loading-category-form'
import { UpdateCategoryForm } from '@/features/categories/components/forms/update-category-form'
import { categoryQueryOptions } from '@/features/categories/query-options'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

const UpdateCategoryView = () => {
    const { t } = useTranslation()

    const { categoryId } = useParams()

    const categoryUserQuery = useQuery(categoryQueryOptions.findById(Number(categoryId)))

    return (
        <div className='mx-auto max-w-2xl'>
            <div className='mb-1 flex items-center space-x-1 text-neutral-800'>
                <Link to={'/categories'} className='text-neutral-500 hover:text-neutral-900'>
                    <Button variant={'ghost'} size={'icon'}>
                        <ArrowLeft />
                    </Button>
                </Link>

                <h1 className='text-lg font-bold'>
                    {t('Update {{resource}}', {
                        resource: t('Category'),
                    })}
                </h1>
            </div>

            <Card className='w-full p-4'>
                {categoryUserQuery.isPending ? (
                    <LoadingCategoryForm />
                ) : (
                    <UpdateCategoryForm category={categoryUserQuery.data.data} />
                )}
            </Card>
        </div>
    )
}

export default UpdateCategoryView
