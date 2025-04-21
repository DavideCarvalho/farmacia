import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { PaginatedResponse } from '@/types/pagination';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head } from '@inertiajs/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { query } from '@vortechron/query-builder-ts';
import axios from 'axios';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z
    .object({
        product_id: z.string().min(1, 'Produto é obrigatório'),
        type: z.enum(['entry', 'exit']),
        quantity: z.string().min(1, 'Quantidade é obrigatória'),
        unit_price: z.string().min(1, 'Preço unitário é obrigatório').optional(),
        reason: z.string().min(1, 'Motivo é obrigatório'),
        lot_number: z.string().optional(),
        expiration_date: z.string().optional(),
        department_id: z.string().optional(),
        supplier_id: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.type === 'entry') {
                return !!data.supplier_id && !!data.unit_price;
            }
            return !!data.department_id;
        },
        {
            message: 'Fornecedor e preço são obrigatórios para entrada e Setor é obrigatório para saída',
            path: ['supplier_id', 'department_id', 'unit_price'],
        },
    );

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const columnHelper = createColumnHelper<App.Data.InventoryMovementData>();

const columns = [
    columnHelper.accessor('created_at', {
        header: 'Data',
        cell: ({ row }) => {
            const date = row.getValue('created_at') as string;
            return date ? new Date(date).toLocaleDateString() : '-';
        },
    }),
    columnHelper.accessor((row) => row.product?.name, {
        id: 'product.name',
        header: 'Produto',
        cell: ({ row }) => {
            const product = row.getValue('product.name') as string;
            return product ?? '-';
        },
    }),
    columnHelper.accessor((row) => (row.type === 'entry' ? 'Entrada' : 'Saída'), {
        id: 'type',
        header: 'Tipo',
        cell: ({ row }) => {
            const label = row.getValue('type') as string;
            return (
                <Badge variant={label === 'Entrada' ? 'default' : 'destructive'} className="flex items-center gap-1">
                    {label === 'Entrada' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {label}
                </Badge>
            );
        },
    }),
    columnHelper.accessor('quantity', {
        header: 'Quantidade',
        cell: ({ row }) => {
            const quantity = row.getValue('quantity') as number;
            return quantity;
        },
    }),
    columnHelper.accessor((row) => row.unit_price * 100, {
        id: 'unit_price',
        header: 'Preço Unitário',
        cell: ({ row }) => {
            const price = row.getValue('unit_price') as number;
            return currencyFormatter.format(price);
        },
    }),
    columnHelper.accessor('reason', {
        header: 'Motivo',
        cell: ({ row }) => {
            const reason = row.getValue('reason') as string;
            return reason;
        },
    }),
    columnHelper.accessor((row) => row.user?.name, {
        id: 'user.name',
        header: 'Usuário',
        cell: ({ row }) => {
            const user = row.getValue('user.name') as string;
            return user;
        },
    }),
];

function Index() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<string>('created_at');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [isOpen, setIsOpen] = useState(false);
    const perPage = 10;

    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get<App.Data.ProductData[]>(route('api.products.get-all'));
            return response.data;
        },
    });

    const { data: departments } = useQuery({
        queryKey: ['departments'],
        queryFn: async () => {
            const response = await axios.get<App.Data.DepartmentData[]>(route('api.departments.get-all'));
            return response.data;
        },
    });

    const { data: suppliers } = useQuery({
        queryKey: ['suppliers'],
        queryFn: async () => {
            const response = await axios.get<App.Data.SupplierData[]>(route('api.suppliers.get-all'));
            return response.data;
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: 'entry',
        },
    });

    const movementType = form.watch('type');

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post(route('api.inventory-movements.create'), values);

            toast.success('Movimentação criada com sucesso');
            setIsOpen(false);
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['inventory-movements', page, perPage, search, sortBy, sortDirection] });
        } catch {
            toast.error('Erro ao criar movimentação');
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['inventory-movements', page, perPage, search, sortBy, sortDirection],
        queryFn: async () => {
            const q = query(route('api.inventory-movements.get'))
                .page(page)
                .param('per_page', perPage.toString())
                .param('sort', sortBy)
                .param('sort_direction', sortDirection);

            if (search) {
                q.filter('search', search);
            }

            const response = await axios.get<PaginatedResponse<App.Data.InventoryMovementData>>(q.build());
            return response.data;
        },
    });

    const handleSortChange = (newSortBy: string, newSortDirection: 'asc' | 'desc') => {
        setSortBy(newSortBy);
        setSortDirection(newSortDirection);
        setPage(1);
    };

    return (
        <>
            <Head title="Movimentações de Estoque" />

            <div className="flex w-full justify-center py-6">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Movimentações de Estoque</CardTitle>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>Nova Movimentação</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Nova Movimentação</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione o tipo" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="entry">Entrada</SelectItem>
                                                            <SelectItem value="exit">Saída</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {movementType === 'entry' ? (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="supplier_id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Fornecedor</FormLabel>
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={(value) => {
                                                                    field.onChange(value);
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecione um fornecedor" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {suppliers?.map((supplier) => (
                                                                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                                                            {supplier.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="unit_price"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Preço Unitário</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" step="0.01" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        ) : (
                                            <FormField
                                                control={form.control}
                                                name="department_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Setor</FormLabel>
                                                        <Select
                                                            value={field.value}
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                            }}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione um setor" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {departments?.map((department) => (
                                                                    <SelectItem key={department.id} value={department.id.toString()}>
                                                                        {department.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        <FormField
                                            control={form.control}
                                            name="product_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Produto</FormLabel>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                        }}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione um produto" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {products?.map((product) => (
                                                                <SelectItem key={product.id} value={product.id.toString()}>
                                                                    {product.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Quantidade</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" step="0.01" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="reason"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Motivo</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {movementType === 'entry' && (
                                            <>
                                                <FormField
                                                    control={form.control}
                                                    name="lot_number"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Número do Lote</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="expiration_date"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Data de Validade</FormLabel>
                                                            <FormControl>
                                                                <Input type="date" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </>
                                        )}
                                        <Button type="submit" className="w-full">
                                            Salvar
                                        </Button>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={data?.data ?? []}
                            pageCount={data?.last_page ?? 0}
                            currentPage={page}
                            isLoading={isLoading}
                            search={search}
                            onSearchChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                            onPageChange={setPage}
                            onSortChange={handleSortChange}
                            searchPlaceholder="Pesquisar por produto, motivo ou usuário..."
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Index;
