import { ValidationError } from '../classes/validation-error'
import { ImageValidationRulesMessagesType } from '../types'

export class InvalidImageError extends Error {
    constructor(public errors: ImageValidationRulesMessagesType) {
        const firstError = Object.values(errors).find(Boolean) as ValidationError

        super(firstError.message)
    }

    getErrors() {
        return Object.fromEntries(Object.entries(this.errors).filter(entry => entry[1] !== undefined))
    }
}
