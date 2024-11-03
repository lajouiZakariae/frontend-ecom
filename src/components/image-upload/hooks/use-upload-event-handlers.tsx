import type { ChangeEventHandler, Dispatch, DragEventHandler, SetStateAction } from 'react'

interface UseUploadEventHandlersProps {
    setIsDragOver: Dispatch<SetStateAction<boolean>>
    uploadFile: (file: File) => void
}

export const useUploadEventHandlers = ({ setIsDragOver, uploadFile }: UseUploadEventHandlersProps) => {
    const handleDrop: DragEventHandler<HTMLDivElement> = e => {
        e.preventDefault()

        setIsDragOver(false)

        const uploadedFile = Array.from(e.dataTransfer.files).at(0)

        uploadFile(uploadedFile as File)
    }

    const handleFileSelect: ChangeEventHandler<HTMLInputElement> = e => {
        const uploadedFile = Array.from(e.target.files || []).at(0)

        uploadFile(uploadedFile as File)
    }

    const handleDragOver: DragEventHandler<HTMLDivElement> = event => {
        event.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave: DragEventHandler<HTMLDivElement> = () => {
        setIsDragOver(false)
    }

    return {
        handleDrop,
        handleFileSelect,
        handleDragOver,
        handleDragLeave,
    }
}
