import { useMemo, useState } from 'react'
import { UploadedImage } from '../classes/uploaded-image'
import { InvalidImageError } from '../exceptions/invalid-image-error'
import { validateFile } from '../utils/validate-file'
import { imageExtensions, imageMimeTypes } from '../config/extensions'
import { ImageUplaodProps } from '../types'

import { useUploadEventHandlers } from './use-upload-event-handlers'

export const useImageUpload = (props: ImageUplaodProps) => {
    const { validationRules, errorMessages, onError, onSuccessfulImageUpload, defaultImage } = props

    const [uploadedImage, setUploadedImage] = useState<UploadedImage | undefined>(undefined)

    const [validationErrors, setValidationErrors] = useState<InvalidImageError | undefined>(undefined)

    const [isDragOver, setIsDragOver] = useState(false)

    // Prepare validation rules
    const preparedValidationRules = useMemo(
        () => ({
            types: validationRules?.types || imageMimeTypes,
            extensions: validationRules?.extensions || imageExtensions,
            maxSize: validationRules?.maxSize,
            minSize: validationRules?.minSize,
            sizeBetween: validationRules?.sizeBetween,
        }),
        [validationRules],
    )

    const uploadFile = (file: File) => {
        setUploadedImage(new UploadedImage(file))

        if (file) {
            try {
                validateFile(file, preparedValidationRules, errorMessages)

                setValidationErrors(undefined)

                onSuccessfulImageUpload(new UploadedImage(file))
            } catch (error) {
                if (error instanceof InvalidImageError) {
                    setValidationErrors(error)

                    onError?.(error)
                }
            }
        }
    }

    const { handleDragLeave, handleDragOver, handleDrop, handleFileSelect } = useUploadEventHandlers({
        setIsDragOver,
        uploadFile,
    })

    const imgSrc = useMemo(() => {
        if (uploadedImage && !validationErrors) {
            return URL.createObjectURL(uploadedImage.getFile())
        }

        return defaultImage
    }, [uploadedImage, validationErrors, defaultImage])

    return {
        uploadedImage,
        validationErrors,
        isDragOver,
        imgSrc,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileSelect,
    }
}
