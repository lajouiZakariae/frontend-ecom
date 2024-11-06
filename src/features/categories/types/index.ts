import { Image } from '@/types'

export interface CategoryFormValues {
    image: File | null
    name: string
}

export interface Category {
    id: number
    image: Image
    name: string
    created_at: string
}
