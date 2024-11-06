import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingFormGroup = () => (
    <div className='space-y-2'>
        <Skeleton className='size-[16px] w-20' />

        <Skeleton className='h-8 w-full' />
    </div>
)

export const LoadingCategoryForm = () => (
    <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
            <LoadingFormGroup />

            <LoadingFormGroup />
        </div>

        <LoadingFormGroup />

        <LoadingFormGroup />

        <LoadingFormGroup />

        <Button size={'lg'} className='w-full' disabled>
            <Skeleton className='h-8 w-20' />
        </Button>
    </div>
)
