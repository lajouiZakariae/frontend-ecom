import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function useValidatedFiltersFromURLParams(schema: unknown) {
    const [searchParams] = useSearchParams()

    const [validatedValues, setValidatedValues] = useState()

    useEffect(() => {
        const initialValues: Record<string, unknown> = {}

        searchParams.forEach((value, key) => {
            initialValues[key] = value
        })

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
