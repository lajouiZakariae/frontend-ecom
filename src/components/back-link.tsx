import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { FC } from 'react'
import { Link, To } from 'react-router-dom'

export const BackLink: FC<{ to: To }> = ({ to }) => {
    return (
        <Link to={to} className='text-neutral-500 hover:text-neutral-900'>
            <Button variant='ghost' size='icon'>
                <ArrowLeft />
            </Button>
        </Link>
    )
}
