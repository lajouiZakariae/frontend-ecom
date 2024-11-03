import { Button } from '@/components/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { FC, useEffect, useState } from 'react'

interface MultiSelectDropdownFilterProps {
    title: string
    options: { label: string; value: string }[]
    selectedOptions: { label: string; value: string }[]
    setSelectedOptions: (options: { label: string; value: string }[]) => void
}

export const MultiSelectDropdownFilter: FC<MultiSelectDropdownFilterProps> = ({
    title,
    options,
    selectedOptions,
    setSelectedOptions,
}) => {
    const [selectedValues, setSelectedValues] = useState<{ label: string; value: string }[]>(selectedOptions)

    useEffect(() => {
        setSelectedOptions(selectedValues)
    }, [selectedValues])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='h-8 border-dashed'>
                    <PlusCircledIcon className='mr-2 size-4' />
                    {title}

                    {selectedOptions?.length > 0 || options.length > 2 ? (
                        <Separator orientation='vertical' className='mx-1 h-4' />
                    ) : null}

                    {/* {selectedOptions?.length > 0 &&
                        selectedOptions.map(status => (
                            <Badge key={status.value} variant='secondary' className='rounded-sm px-1 font-normal'>
                                {status.label}
                            </Badge>
                        ))} */}

                    <div className='hidden space-x-1 lg:flex'>
                        {options.length > 2 ? (
                            <Badge variant='secondary' className='rounded-sm px-1 font-normal'>
                                {selectedValues.length} selected
                            </Badge>
                        ) : (
                            selectedValues
                                // .filter(option => selectedValues.has(option.value))
                                .map(option => (
                                    <Badge
                                        variant='secondary'
                                        key={option.value}
                                        className='rounded-sm px-1 font-normal'
                                    >
                                        {option.label}
                                    </Badge>
                                ))
                        )}
                    </div>
                </Button>
            </PopoverTrigger>

            <PopoverContent className='w-[200px] p-0' align='start'>
                <Command>
                    <CommandInput placeholder={title} />

                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>

                        <CommandGroup>
                            {options.map(option => {
                                const isSelected = selectedValues.find(({ value }) => option.value === value)

                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                setSelectedValues(prev =>
                                                    prev.filter(({ value }) => option.value !== value),
                                                )
                                            } else {
                                                setSelectedValues(prev => [...prev, option])
                                            }
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50 [&_svg]:invisible',
                                            )}
                                        >
                                            <CheckIcon className={cn('h-4 w-4')} />
                                        </div>
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup>
                            <CommandItem onSelect={() => setSelectedValues([])} className='justify-center text-center'>
                                Clear filters
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
