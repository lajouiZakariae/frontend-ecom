import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { MoreHorizontal } from 'lucide-react'
import { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

export const ActionsDropdown: FC<PropsWithChildren> = ({ children }) => {
    const { t } = useTranslation()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open menu</span>

                    <MoreHorizontal className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>

                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
