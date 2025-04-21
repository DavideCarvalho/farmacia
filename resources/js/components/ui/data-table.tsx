import type {
    ColumnDef,
    SortingState,
} from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface DataTableProps<TData> {
    columns: ColumnDef<TData, never>[];
    data: TData[];
    pageCount: number;
    currentPage: number;
    isLoading?: boolean;
    search?: string;
    onSearchChange?: (value: string) => void;
    onPageChange?: (page: number) => void;
    onSortChange?: (sortBy: string, sortDirection: 'asc' | 'desc') => void;
    searchPlaceholder?: string;
}

export function DataTable<TData>({
    columns,
    data,
    pageCount,
    currentPage,
    isLoading = false,
    search,
    onSearchChange,
    onPageChange,
    onSortChange,
    searchPlaceholder = 'Buscar...',
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        pageCount,
        state: {
            sorting,
        },
        onSortingChange: (updater) => {
            setSorting(updater);
            const sort = typeof updater === 'function' ? updater(sorting) : updater;
            if (sort.length > 0) {
                const column = columns.find(col => col.id === sort[0].id);
                onSortChange?.(sort[0].id, sort[0].desc ? 'desc' : 'asc');
            }
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder={searchPlaceholder}
                    value={search ?? ''}
                    onChange={(event) => onSearchChange?.(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className="flex items-center gap-1 cursor-pointer"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            header.column.getToggleSortingHandler()?.(e);
                                                        }
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                    {{
                                                        asc: <ChevronUp className="h-4 w-4" />,
                                                        desc: <ChevronDown className="h-4 w-4" />,
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Carregando...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between py-4">
                <div className="text-sm text-muted-foreground">
                    Página {currentPage} de {pageCount}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange?.(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange?.(currentPage + 1)}
                        disabled={currentPage >= pageCount}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
} 