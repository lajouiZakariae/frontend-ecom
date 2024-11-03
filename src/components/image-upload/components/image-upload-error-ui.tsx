import { UploadImageIcon } from '../icons/upload-image-icon'

export const ImageUploadErrorUI = () => (
    <div className='rounded-md p-6 font-mono shadow-lg'>
        <div className='flex flex-col items-center justify-center rounded-md border border-dashed py-5'>
            <UploadImageIcon className='size-12 text-red-500' />

            <div className='mt-5 text-center text-sm font-bold'>
                <div className='text-muted-foreground'>Ooops! Drag your image here</div>
                <div className='text-muted-foreground'>or</div>
                <div className='text-muted-foreground text-sky-500 hover:underline'>Browse files</div>
            </div>
        </div>
    </div>
)
