import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormikContextType } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const InlineSearchForm: FC<FormikContextType<{ search: string }>> = searchForm => {
    const { t } = useTranslation()

    return (
        <form className='flex items-center space-x-2' onSubmit={searchForm.handleSubmit}>
            <Input placeholder='Search' {...searchForm.getFieldProps('search')} />

            <Button type='submit' disabled={searchForm.values.search === ''}>
                {t('Seach')}
            </Button>
        </form>
    )
}
