import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export const UsersIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={cn('size-5 text-black', className)}
            {...props}
        >
            <path
                fill="currentColor"
                d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0a4.125 4.125 0 0 1-8.25 0m9.75 2.25a3.375 3.375 0 1 1 6.75 0a3.375 3.375 0 0 1-6.75 0M1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63a13.07 13.07 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63zm15.75.003l-.001.144a2.25 2.25 0 0 1-.233.96q.302.018.609.018c1.596 0 3.107-.37 4.451-1.029a.75.75 0 0 0 .42-.642l.004-.204a4.875 4.875 0 0 0-6.961-4.407a8.6 8.6 0 0 1 1.71 5.157z"
            ></path>
        </svg>
    );
};