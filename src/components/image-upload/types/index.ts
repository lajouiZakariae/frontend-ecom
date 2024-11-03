import { UploadedImage } from '../classes/uploaded-image'
import { InvalidImageError } from '../exceptions/invalid-image-error'
import { ExtensionType, MimeTypeType } from '../config/extensions'
import { FC, ReactNode } from 'react'
import { ValidationError } from '../classes/validation-error'

export type onSuccessfulImageUploadHandler = (file: UploadedImage) => void

export type onErrorHandler = (error: InvalidImageError) => void

export type ImageValidationRulesType = {
    types?: MimeTypeType[]
    extensions?: ExtensionType[]
    minSize?: number
    maxSize?: number
    sizeBetween?: [number, number]
}

export type ImageValidationRulesMessagesType = {
    [key in keyof ImageValidationRulesType]: ValidationError
}

export type UserProvidedImageValidationRulesMessagesType = {
    [key in keyof ImageValidationRulesType]?: (data: Exclude<ImageValidationRulesType[key], undefined>) => string
}

export type ErrorMessagesCallbacks = {
    [key in keyof UserProvidedImageValidationRulesMessagesType as UserProvidedImageValidationRulesMessagesType[key] extends undefined
        ? never
        : key]: UserProvidedImageValidationRulesMessagesType[key]
}

export type PropsPassedToCustomUIType = {
    uploadedImage: UploadedImage | undefined
    validationErrors: InvalidImageError | undefined
    imgSrc: string | undefined
    UploadTrigger: FC<{ children: ReactNode }>
    isDragOver: boolean
}

export interface ImageUplaodProps {
    defaultImage?: string
    onSuccessfulImageUpload: onSuccessfulImageUploadHandler
    onError?: onErrorHandler
    validationRules?: ImageValidationRulesType
    errorMessages?: UserProvidedImageValidationRulesMessagesType
    customRenderUI?: FC<PropsPassedToCustomUIType>
    imgClassName?: string
    components?: {
        UploadPlaceholder?: FC
        UploadErrorUI?: FC<{
            errors: {
                [k: string]: ValidationError
            }
        }>
        ImgRenderer?: FC<{ imgSrc: string }>
    }
}
