import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'

interface SquareUploadPlaceholderProps {
    text?: string
    size?: number
    error?: boolean
}

export const SquareUploadPlaceholder = ({
    text = 'Upload image',
    size = 150,
    error = false,
}: SquareUploadPlaceholderProps) => (
    <div
        className={cn(
            'relative flex size-[146px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 transition-colors duration-300 hover:bg-gray-100',
            { 'border-red-500': error },
        )}
        style={{ width: size, height: size }}
    >
        <div className='flex flex-col items-center justify-center p-4 text-center'>
            <Upload className='mb-2 size-8 text-gray-400' />

            <p className='text-sm font-semibold text-gray-500'>{text}</p>
        </div>
    </div>
)
