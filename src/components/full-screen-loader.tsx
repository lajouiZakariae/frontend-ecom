import { LoadingSpinner } from './loading-spinner'

export const FullScreenLoader = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
            <div className='flex flex-col items-center space-y-4'>
                <LoadingSpinner />
            </div>
        </div>
    )
}
