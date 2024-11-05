import { FC, useState } from 'react'
import { categoryQueryKeys } from '../../query-options'
import { CategoryService } from '../../service'
import { useMutation } from '@tanstack/react-query'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'

interface DeleteCategoryDialogProps {
    id: number | null
    setId: (id: number | null) => void
}

export const DeleteCategoryDialog: FC<DeleteCategoryDialogProps> = ({ id, setId }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const deleteCategoryMutation = useMutation({
        mutationFn: CategoryService.deleteById,
        meta: {
            invalidates: [categoryQueryKeys.all()],
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
                    await deleteCategoryMutation.mutateAsync(id)
                }

                setId(null)

                setIsDeleteDialogOpen(false)
            }}
        />
    )
}
