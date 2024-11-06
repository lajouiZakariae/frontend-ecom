import { FC } from 'react'
import { UploadIcon } from '../icons/upload-icon'

interface DefaultImageRendererProps {
    imgSrc: string
    imgClassName?: string
    clearImage: () => void
}

export const DefaultImageRenderer: FC<DefaultImageRendererProps> = ({ imgSrc, imgClassName }) => (
    <div className='group relative'>
        <img src={imgSrc} className={imgClassName} />

        <div className='absolute inset-0 flex size-full cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 transition duration-200 group-hover:opacity-100'>
            <UploadIcon className='size-8 text-white' />
        </div>
    </div>
)
