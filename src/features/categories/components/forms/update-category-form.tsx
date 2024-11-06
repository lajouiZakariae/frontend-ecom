import { CategoryForm } from './category-form'
import { categoryQueryKeys } from '@/features/categories/query-options'
import { CategoryService } from '@/features/categories/service'
import { Category, CategoryFormValues } from '@/features/categories/types'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface UpdateCategoryFormProps {
    category: Category
}

export const UpdateCategoryForm: FC<UpdateCategoryFormProps> = ({ category }) => {
    const { t } = useTranslation()

    const navigate = useNavigate()

    const updateCategoryMutation = useMutation<unknown, Error, FormData>({
        mutationFn: async values => await CategoryService.updateCategory(category.id, values),
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
            name: category.name,
        },
        onSubmit: async values => {
            const formData = new FormData()

            for (const key of Object.keys(values) as (keyof CategoryFormValues)[]) {
                formData.append(key, values[key] as string | File)
            }

            await updateCategoryMutation.mutateAsync(formData)
        },
    })

    return (
        <CategoryForm
            oldValues={category}
            actionTitle={formik.isSubmitting ? `${t('Updating')}...` : t('Update')}
            {...formik}
        />
    )
}
