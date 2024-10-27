import { ColumnDef, SortingState } from '@tanstack/react-table';

import { MoreHorizontal, Trash, Edit } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';

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

type Person = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

const data: Person[] = [
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

const columns: ColumnDef<Person>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorFn: row => `${row.first_name} ${row.last_name}`,
        header: 'Full Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
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

// type SortOptions = {
//     sortBy: 'email' | 'id';
//     order: 'asc' | 'desc';
// };

function TableView() {
    const { page, setPage } = usePagination();

    const [sorting, setSorting] = useState<SortingState>([]);

    const dataTableProps: DatatableProps<Person> = {
        columns,
        data,
        sorting,
        setSorting,
        page,
        pageCount: 10,
        onPageChange: page => {
            setPage(page);
            console.log(page);
        },
        onRowSelectedChange: selectedRows => {},
    };

    return (
        <div className="w-full">
            <DataTable<Person> {...dataTableProps} />
        </div>
    );
}

export default TableView;
