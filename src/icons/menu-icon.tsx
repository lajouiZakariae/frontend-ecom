import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export const MenuIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={cn('size-5 text-black', className)}
            {...props}
        >
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 6h10M4 12h16M7 12h13M7 18h10"
            ></path>
        </svg>
    );
};
