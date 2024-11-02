import { ValidationError } from '../classes/validation-error'
import { imageMimeTypes } from '../config/extensions'
import { InvalidImageError } from '../exceptions/invalid-image-error'
import {
  ImageValidationRulesMessagesType,
  ImageValidationRulesType,
  UserProvidedImageValidationRulesMessagesType,
} from '../types'
import { filesize } from 'filesize'

export const validateFile = (
  file: File,
  validationRules: ImageValidationRulesType,
  errorMessages?: UserProvidedImageValidationRulesMessagesType,
): void => {
  const { types, extensions, minSize, maxSize, sizeBetween } = validationRules

  const errors: ImageValidationRulesMessagesType = {
    minSize: undefined,
    maxSize: undefined,
    types: undefined,
    extensions: undefined,
    sizeBetween: undefined,
  }

  if (
    sizeBetween &&
    (file.size < sizeBetween[0] || file.size > sizeBetween[1])
  ) {
    errors.sizeBetween = new ValidationError(
      errorMessages?.sizeBetween?.(sizeBetween) ??
        `The file size should be greater than ${filesize(sizeBetween[0].toString())} and less than ${filesize(sizeBetween[1].toString())}`,
    )
  } else {
    if (minSize && file.size < minSize) {
      errors.minSize = new ValidationError(
        errorMessages?.minSize?.(minSize) ??
          `The file size should be greater than ${filesize(minSize.toString())}`,
      )
    }

    if (maxSize && file.size > maxSize) {
      errors.maxSize = new ValidationError(
        errorMessages?.maxSize?.(maxSize) ??
          `The file size should be less than ${filesize(maxSize.toString())}`,
      )
    }
  }

  if (types) {
    const requiredMimeTypes = imageMimeTypes.filter((extenstion) =>
      types.includes(extenstion),
    )

    const isValidType = requiredMimeTypes.some(
      (mimeType) => file.type === mimeType,
    )

    if (!isValidType) {
      errors.types = new ValidationError(
        errorMessages?.types?.(types) ??
          `The file should be of type ${types.join(', ')}`,
      )
    }
  }

  if (extensions) {
    const requiredExtensions = extensions.filter((extenstion) =>
      extensions.includes(extenstion),
    )

    const isValidExtension = requiredExtensions.some((extension) =>
      file.name.endsWith(extension),
    )

    if (!isValidExtension) {
      errors.extensions = new ValidationError(
        errorMessages?.extensions?.(extensions) ??
          `The file should have extension ${extensions.join(', ')}`,
      )
    }
  }

  const hasError = Object.values(errors).some(Boolean)

  if (hasError) {
    throw new InvalidImageError(errors)
  }
}
