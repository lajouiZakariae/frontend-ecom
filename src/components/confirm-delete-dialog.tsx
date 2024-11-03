import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'

interface ConfirmDeleteDialogProps {
    button: ReactNode
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onConfirm: () => void
}

export const ConfirmDeleteDialog: FC<ConfirmDeleteDialogProps> = ({ button, isOpen, setIsOpen, onConfirm }) => {
    const { t } = useTranslation()

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {button}

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Are you absolutely sure?')}</DialogTitle>

                    <DialogDescription>
                        {t(
                            'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
                        )}
                    </DialogDescription>

                    <DialogFooter>
                        <DialogClose>
                            <Button variant='secondary'>{t('Cancel')}</Button>
                        </DialogClose>

                        {/* <DialogClose> */}
                        <Button variant='destructive' onClick={onConfirm}>
                            {t('Delete')}
                        </Button>
                        {/* </DialogClose> */}
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
