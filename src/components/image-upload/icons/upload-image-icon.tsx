import { useMemo, type SVGProps } from 'react'

export function UploadImageIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
    const preparedClassName = useMemo(() => {
        let preparedClassName = className || ''

        if (!/size-.*/.test(preparedClassName)) {
            preparedClassName += ' size-6'
        }

        if (!/text-.*/.test(preparedClassName)) {
            preparedClassName += ' text-gray-600'
        }

        return preparedClassName
    }, [className])

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className={`${preparedClassName} ${className}`}
            {...props}
        >
            <g
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                color='currentColor'
            >
                <path d='M13 3.002Q12.295 3 11.5 3C7.022 3 4.782 3 3.391 4.391S2 8.021 2 12.5c0 4.478 0 6.718 1.391 8.109S7.021 22 11.5 22c4.478 0 6.718 0 8.109-1.391c1.338-1.339 1.389-3.462 1.39-7.609'></path>
                <path d='M2 14.135q.93-.135 1.872-.132c2.652-.056 5.239.77 7.3 2.331c1.91 1.448 3.253 3.44 3.828 5.666'></path>
                <path d='M21 16.896c-1.175-.595-2.391-.897-3.614-.896c-1.851-.007-3.684.673-5.386 2m5-13.5c.491-.506 1.8-2.5 2.5-2.5M22 4.5c-.491-.506-1.8-2.5-2.5-2.5m0 0v8'></path>
            </g>
        </svg>
    )
}