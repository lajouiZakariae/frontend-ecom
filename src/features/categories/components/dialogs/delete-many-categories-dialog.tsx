import { FC, useState } from 'react'
import { categoryQueryKeys } from '../../query-options'
import { CategoryService } from '../../service'
import { useMutation } from '@tanstack/react-query'
import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface DeleteManyCategoriesDialogProps {
    selectedRows: number[]
    onSuccess: () => void
}

export const DeleteManyCategoriesDialog: FC<DeleteManyCategoriesDialogProps> = ({ selectedRows, onSuccess }) => {
    const { t } = useTranslation()

    const [isDeleteManyDialogOpen, setIsDeleteManyDialogOpen] = useState(false)

    const deleteManyCategoryMutation = useMutation({
        mutationFn: CategoryService.deleteMany,
        meta: {
            invalidates: [categoryQueryKeys.all()],
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
                await deleteManyCategoryMutation.mutateAsync(selectedRows)

                onSuccess()

                setIsDeleteManyDialogOpen(false)
            }}
        />
    )
}
