import { SolidCaretDownIcon } from '@/components/icons/solid-caret-down-icon'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useClearUserData } from '@/features/auth/hooks/use-clear-user-data'
import { useLogout } from '@/hooks/use-logout'
import { TokenStorageService } from '@/lib/token-storage-serve'
import { cn } from '@/lib/utils'
import { LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const UserHeaderDropdown = () => {
    const { t } = useTranslation()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const { logoutAsync, isPending } = useLogout()

    const navigate = useNavigate()

    const clearUserData = useClearUserData()

    const onSuccessfulLogout = () => {
        navigate('/login')

        clearUserData()

        setIsDropdownOpen(false)

        TokenStorageService.removeToken()
    }

    return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
                <div className='group flex cursor-pointer items-center rounded-md p-2 transition hover:bg-neutral-100'>
                    <div className='size-[38px] rounded-full bg-neutral-200'></div>
                    <div className='ml-2 flex flex-col'>
                        <h3 className='font-bold tracking-wider text-neutral-900'>Zakariae Lajoui</h3>
                        <p className='text-xs tracking-wider text-neutral-400'>Admin</p>
                    </div>

                    <div className='ml-2'>
                        <SolidCaretDownIcon
                            className={cn('size-7 text-gray-500 transition hover:text-primary', {
                                'rotate-180': isDropdownOpen,
                            })}
                        />
                    </div>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' alignOffset={13} sideOffset={15} className='w-[190px]'>
                <DropdownMenuLabel>{t('My Account')}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>{t('Profile')}</DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className='cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-500'
                    disabled={isPending}
                    onSelect={ev => {
                        ev.preventDefault()
                        logoutAsync(undefined, {
                            onSuccess: onSuccessfulLogout,
                        })
                    }}
                >
                    <LogOutIcon />

                    {isPending ? t('Logging out...') : t('Log out')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
