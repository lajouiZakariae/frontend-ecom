import type { FC } from 'react'
import { useField, useFormikContext } from 'formik'
import { Input, InputProps } from '@/components/ui/input'

export interface TextFieldProps extends InputProps {
    name: string
}

export const TextField: FC<TextFieldProps> = ({ name, ...props }) => {
    const { submitCount } = useFormikContext()

    const [field, properties] = useField(name)

    const hasError = !!(submitCount && properties.error)

    return <Input id={name} error={hasError} {...field} {...props} />
}
