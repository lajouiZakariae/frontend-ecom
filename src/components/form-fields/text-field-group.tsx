import { useField, useFormikContext } from 'formik'
import { Label } from '@/components/ui/label'
import { TextField, TextFieldProps } from './text-field'

interface TextFieldGroupProps extends TextFieldProps {
    label: string
}

export const TextFieldGroup: React.FC<TextFieldGroupProps> = ({ label, name, ...props }) => {
    const { submitCount } = useFormikContext()

    const [, properties] = useField(name)

    const hasError = !!(submitCount && properties.error)

    return (
        <div className='space-y-2'>
            <Label htmlFor={name}>{label}</Label>

            <TextField name={name} {...props} />

            {hasError && <p className='text-sm text-red-500'>{properties.error}</p>}
        </div>
    )
}
