import { useState } from 'react'
import { BoxIcon, User2Icon } from 'lucide-react'
import { SidebarItemWithDropDownProps } from './sidebar-item-with-dropdown'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from './section-title'

export const Navigation = () => {
    const { t } = useTranslation()

    const [currentActiveMenu, setCurrentActiveMenu] = useState<null | string>('customers')

    const { pathname } = useLocation()

    const toggleActiveMenu = (menu: string) =>
        currentActiveMenu === menu ? setCurrentActiveMenu(null) : setCurrentActiveMenu(menu)

    return (
        <>
            <SectionTitle className='mb-2'>{t('management')}</SectionTitle>

            <SidebarItemWithDropDownProps
                id='customers'
                text={t('Customers')}
                Icon={User2Icon}
                currentActiveMenu={currentActiveMenu}
                toggleActiveMenu={toggleActiveMenu}
                childrenRoutes={[
                    { text: t('List'), to: '/customers', active: pathname === '/customers' },
                    { text: t('Create'), to: '/customers/create', active: pathname === '/customers/create' },
                ]}
            />

            <SidebarItemWithDropDownProps
                id='categories'
                text={t('Categories')}
                Icon={BoxIcon}
                currentActiveMenu={currentActiveMenu}
                toggleActiveMenu={toggleActiveMenu}
                childrenRoutes={[
                    { text: t('List'), to: '/categories', active: pathname === '/categories' },
                    { text: t('Create'), to: '/categories/create', active: pathname === '/categories/create' },
                ]}
            />
        </>
    )
}
