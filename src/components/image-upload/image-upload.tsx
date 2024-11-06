import type { FC, ReactNode } from 'react'
import { ImageUploadUI } from './components'
import { ImageUploadErrorUI } from './components/image-upload-error-ui'
import { ImageUplaodProps } from './types'
import { useImageUpload } from './hooks/image-upload-hook'
import { DefaultImageRenderer } from './components/DefaultImageRenderer'

export const ImageUpload: FC<ImageUplaodProps> = props => {
    const { components, imgClassName } = props

    const {
        uploadedImage,
        validationErrors,
        imgSrc,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileSelect,
        clearImage,
    } = useImageUpload(props)

    const { UploadErrorUI, UploadPlaceholder, ImgRenderer } = components || {}

    const uploadPlaceholderComponent = UploadPlaceholder ? <UploadPlaceholder /> : <ImageUploadUI />

    const errorOnUplaodComponent =
        UploadErrorUI && validationErrors ? (
            <UploadErrorUI errors={validationErrors?.getErrors()} />
        ) : (
            <ImageUploadErrorUI />
        )

    const renderedImage = imgSrc ? (
        ImgRenderer ? (
            <ImgRenderer imgSrc={imgSrc} clearImage={clearImage} />
        ) : (
            <DefaultImageRenderer imgSrc={imgSrc} imgClassName={imgClassName} clearImage={clearImage} />
        )
    ) : null

    const UploadTrigger: FC<{ children: ReactNode }> = ({ children }) => (
        <div onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
            <input type='file' id='image-upload' hidden className='sr-only' onChange={handleFileSelect} />

            <label htmlFor='image-upload'>{children}</label>
        </div>
    )

    const renderUI = () => {
        if (uploadedImage && validationErrors) {
            return errorOnUplaodComponent
        }

        if (uploadedImage || imgSrc) {
            return renderedImage
        }

        return uploadPlaceholderComponent
    }

    return <UploadTrigger>{renderUI()}</UploadTrigger>
}
