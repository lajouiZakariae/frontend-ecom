import { CustomersDatatable } from '@/features/customers/components/customer-datatable'
import { useSetDocumentTitle } from '@/hooks/use-set-document-title'
import { useTranslation } from 'react-i18next'

const CustomersView = () => {
    const { t } = useTranslation()

    useSetDocumentTitle(t('Customers'))

    return <CustomersDatatable />
}

export default CustomersView
