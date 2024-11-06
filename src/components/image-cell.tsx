interface ImageCellProps {
    src: string
    alt: string
    size?: number
}

export const ImageCell = ({ src, alt, size = 40 }: ImageCellProps) => {
    return (
        <div className='flex items-center justify-center'>
            <div className='relative overflow-hidden rounded-md shadow' style={{ width: size, height: size }}>
                <img src={src} alt={alt} className='size-full object-cover transition-transform hover:scale-110' />
            </div>
        </div>
    )
}
