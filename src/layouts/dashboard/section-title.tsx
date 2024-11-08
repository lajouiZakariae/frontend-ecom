import { cn } from '@/lib/utils'
import { MinusIcon } from 'lucide-react'
import type { FC, HTMLAttributes } from 'react'

export const SectionTitle: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
    return (
        <h2
            className={cn(
                'flex items-center rounded-md bg-neutral-100 px-7 py-2 text-xs uppercase tracking-wider text-gray-500',
                className,
            )}
            {...props}
        >
            <MinusIcon className='hidden h-5 w-4 flex-none' />
            <span>{children}</span>
        </h2>
    )
}
