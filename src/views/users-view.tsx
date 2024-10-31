import { ColumnDef, SortingState } from '@tanstack/react-table';

import { MoreHorizontal, Trash, Edit, Trash2 } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { DataTable, DatatableProps } from '@/components/datatables/datatable';
import { usePagination } from '@/hooks/use-pagination';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/features/users/service';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

const data: User[] = [
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
    {
        id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
    },
    {
        id: 3,
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob@example.com',
    },
];

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        id: 'id',
    },
    {
        accessorFn: row => `${row.first_name} ${row.last_name}`,
        header: 'Full Name',
        id: 'full_name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
        id: 'email',
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const person = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => console.log('Edit', person)}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => console.log('Delete', person)}
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const UsersView = () => {
    const { t } = useTranslation();

    const { page, setPage } = usePagination();

    const [sorting, setSorting] = useState<SortingState>([]);

    const sortBy = sorting.at(0)?.id;

    const order = sorting.at(0)?.desc ? 'desc' : 'asc';

    // Handle Quering the data
    const usersQuery = useQuery({
        queryKey: ['users', { page, sortBy, order }],
        queryFn: async () =>
            await UserService.getPaginatedAndFilteredUsers({
                page,
                sortBy,
                order,
            }),
    });

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const dataTableProps: DatatableProps<User> = {
        columns,
        data: usersQuery.data?.data || data,
        isError: usersQuery.isError,
        isFetching: usersQuery.isLoading,
        sorting,
        setSorting,
        page,
        pageCount: 10,
        getRowId: row => row.id.toString(),
        onPageChange: setPage,
        onRowSelectedChange: selectedRows => {
            setSelectedRows(selectedRows.map(Number));
        },
    };

    const statusOptions = [
        { label: 'Active', value: 'active' },
        { label: 'Banned', value: 'banned' },
    ];

    const [filters, setFilters] = useState({
        statusOptions: [statusOptions[0]],
    });

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-dashed"
                            >
                                <PlusCircledIcon className="mr-2 h-4 w-4" />
                                {t('Status')}

                                {filters.statusOptions?.length > 0 && (
                                    <Separator
                                        orientation="vertical"
                                        className="mx-2 h-4"
                                    />
                                )}

                                {filters.statusOptions?.length > 0 &&
                                    filters.statusOptions.map(status => (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-sm px-1 font-normal lg:hidden"
                                        >
                                            {t(status.label)}
                                        </Badge>
                                    ))}

                                <div className="hidden space-x-1 lg:flex">
                                    {/* {"selectedValues.size" > 2 ? (
                                            <Badge
                                                variant="secondary"
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {selectedValues.size} selected
                                            </Badge>
                                        ) : (
                                            options
                                                .filter(option =>
                                                    selectedValues.has(
                                                        option.value
                                                    )
                                                )
                                                .map(option => (
                                                    <Badge
                                                        variant="secondary"
                                                        key={option.value}
                                                        className="rounded-sm px-1 font-normal"
                                                    >
                                                        {option.label}
                                                    </Badge>
                                                ))
                                        )} */}
                                </div>
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[200px] p-0" align="start">
                            <Command>
                                <CommandInput placeholder={t('Status')} />

                                <CommandList>
                                    <CommandEmpty>
                                        No results found.
                                    </CommandEmpty>

                                    <CommandGroup>
                                        {statusOptions.map(option => {
                                            const isSelected =
                                                filters.statusOptions.find(
                                                    ({ value }) =>
                                                        option.value === value
                                                );

                                            return (
                                                <CommandItem
                                                    key={option.value}
                                                    onSelect={() => {
                                                        if (isSelected) {
                                                            setFilters(
                                                                prev => ({
                                                                    ...prev,
                                                                    statusOptions:
                                                                        prev.statusOptions.filter(
                                                                            ({
                                                                                value,
                                                                            }) =>
                                                                                option.value !==
                                                                                value
                                                                        ),
                                                                })
                                                            );
                                                        } else {
                                                            setFilters(
                                                                prev => ({
                                                                    ...prev,
                                                                    statusOptions:
                                                                        [
                                                                            ...prev.statusOptions,
                                                                            option,
                                                                        ],
                                                                })
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <div
                                                        className={cn(
                                                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                            isSelected
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'opacity-50 [&_svg]:invisible'
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                'h-4 w-4'
                                                            )}
                                                        />
                                                    </div>
                                                    <span>
                                                        {t(option.label)}
                                                    </span>
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup>
                                        <CommandItem
                                            onSelect={() =>
                                                setFilters(prev => ({
                                                    ...prev,
                                                    statusOptions: [],
                                                }))
                                            }
                                            className="justify-center text-center"
                                        >
                                            Clear filters
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <Button
                    variant="destructive"
                    size="sm"
                    disabled={selectedRows.length === 0}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                </Button>
            </div>
            <DataTable<User> {...dataTableProps} />
        </div>
    );
};

export default UsersView;
