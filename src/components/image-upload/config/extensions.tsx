export const imageExtensionsMappedToTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    ico: 'image/vnd.microsoft.icon',
    avif: 'image/avif',
    heic: 'image/heic',
    apng: 'image/apng',
    xcf: 'image/x-xcf',
} as const

export type ExtensionType = keyof typeof imageExtensionsMappedToTypes
export type MimeTypeType = (typeof imageExtensionsMappedToTypes)[ExtensionType]

export const imageExtensions = Object.keys(imageExtensionsMappedToTypes) as ExtensionType[]

export const imageMimeTypes = Object.values(imageExtensionsMappedToTypes) as MimeTypeType[]
