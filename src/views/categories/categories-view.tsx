import { CategoriesDatatable } from '@/features/categories/componetns/categories-datatable'
import { useSetDocumentTitle } from '@/hooks/use-set-document-title'
import { useTranslation } from 'react-i18next'

const CategoriesView = () => {
    const { t } = useTranslation()

    useSetDocumentTitle(t('Categories'))

    return <CategoriesDatatable />
}

export default CategoriesView
