import { LoadingSpinner } from './loading-spinner'

export const PageLoader = () => {
    return (
        <div className='flex h-[calc(100vh_-_166px)] items-center justify-center backdrop-blur-sm'>
            <div className='flex flex-col items-center space-y-4'>
                <LoadingSpinner />
            </div>
        </div>
    )
}
