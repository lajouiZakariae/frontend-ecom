import { FC, useState } from 'react'
import { customerQueryKeys } from '../../query-options'
import { CustomerService } from '../../service'
import { useMutation } from '@tanstack/react-query'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'

interface DeleteCustomerDialogProps {
    id: number | null
    setId: (id: number | null) => void
}

export const DeleteCustomerDialog: FC<DeleteCustomerDialogProps> = ({ id, setId }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const deleteCustomerMutation = useMutation({
        mutationFn: CustomerService.deleteById,
        meta: {
            invalidates: [customerQueryKeys.all()],
        },
    })

    return (
        <ConfirmDeleteDialog
            isOpen={isDeleteDialogOpen}
            setIsOpen={open => {
                if (open === false) setId(null)
                setIsDeleteDialogOpen(open)
            }}
            button={undefined}
            onConfirm={async () => {
                if (id) {
                    await deleteCustomerMutation.mutateAsync(id)
                }

                setId(null)

                setIsDeleteDialogOpen(false)
            }}
        />
    )
}
