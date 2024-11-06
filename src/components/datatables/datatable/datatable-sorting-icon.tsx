import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

export const DatatableSortingIcon = ({ sortintState }: { sortintState: 'asc' | 'desc' | false }) => {
    if (!sortintState) {
        return <ArrowUpDown className='size-4' />
    }

    return {
        asc: <ArrowDown className='size-4' />,
        desc: <ArrowUp className='size-4' />,
    }[sortintState]
}
