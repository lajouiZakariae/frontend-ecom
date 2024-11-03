import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as Yup from 'yup'

export function useValidatedFiltersFromURLParams<T>(schema: Yup.ObjectSchema<T>): T | undefined {
    const [searchParams] = useSearchParams()

    const [validatedValues, setValidatedValues] = useState<T | undefined>()

    useEffect(() => {
        const initialValues: Record<string, unknown> = {}

        // Convert search params to an object
        searchParams.forEach((value, key) => {
            initialValues[key] = value
        })

        // Validate against the provided Yup schema
        schema
            .validate(initialValues, { abortEarly: false })
            .then(validated => {
                setValidatedValues(validated)
            })
            .catch(err => {
                console.error('Validation Error:', err.errors)
                setValidatedValues(undefined) // Reset if validation fails
            })
    }, [searchParams, schema])

    return validatedValues
}
