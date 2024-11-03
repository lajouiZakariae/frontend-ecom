import { CustomersDatatable } from '@/features/users/components/customer-datatable'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'

const CustomersView = () => {
    const { t } = useTranslation()

    useDocumentTitle(t('Customers'))

    return <CustomersDatatable />
}

export default CustomersView
