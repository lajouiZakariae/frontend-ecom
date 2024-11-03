import { useState } from 'react'
import { customerQueryKeys } from '../query-options'
import { CustomerService } from '../service'
import { useMutation } from '@tanstack/react-query'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const DeleteManyCustomersDialog = ({ selectedRows, onSuccess }) => {
    const { t } = useTranslation()

    const [isDeleteManyDialogOpen, setIsDeleteManyDialogOpen] = useState(false)

    const deleteManyCustomerMutation = useMutation({
        mutationFn: CustomerService.deleteMany,
        meta: {
            invalidates: [customerQueryKeys.all()],
        },
    })

    return (
        <ConfirmDeleteDialog
            isOpen={isDeleteManyDialogOpen}
            setIsOpen={setIsDeleteManyDialogOpen}
            button={
                <Button
                    variant='destructive'
                    size='sm'
                    disabled={selectedRows.length === 0}
                    onClick={() => {
                        setIsDeleteManyDialogOpen(true)
                    }}
                >
                    <Trash2 className='mr-2 size-4' />
                    {t('Delete Selected')}
                </Button>
            }
            onConfirm={async () => {
                await deleteManyCustomerMutation.mutateAsync(selectedRows)

                onSuccess()

                setIsDeleteManyDialogOpen(false)
            }}
        />
    )
}
