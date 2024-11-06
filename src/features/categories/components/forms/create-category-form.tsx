import { CategoryForm } from './category-form'
import { categoryQueryKeys } from '@/features/categories/query-options'
import { CategoryService } from '@/features/categories/service'
import { CategoryFormValues } from '@/features/categories/types'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const CreateCategoryForm = () => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const createCategoryMutation = useMutation({
        mutationFn: CategoryService.createCategory,
        meta: {
            invalidates: [categoryQueryKeys.all()],
        },
        onSuccess: () => {
            navigate('/categories')
        },
    })

    const formik = useFormik<CategoryFormValues>({
        initialValues: {
            image: null,
            name: '',
        },
        onSubmit: async values => {
            const formData = new FormData()

            for (const key of Object.keys(values) as (keyof CategoryFormValues)[]) {
                formData.append(key, values[key] as string | File)
            }

            await createCategoryMutation.mutateAsync(formData)
        },
    })

    return (
        <CategoryForm
            actionTitle={
                formik.isSubmitting
                    ? `${t('Creating {{resource}}', {
                          resource: t('Category'),
                      })}...`
                    : t('Create {{resource}}', {
                          resource: t('Category'),
                      })
            }
            {...formik}
        />
    )
}
