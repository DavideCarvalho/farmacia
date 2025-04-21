import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { PaginatedResponse } from '@/types/pagination';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head } from '@inertiajs/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { query } from '@vortechron/query-builder-ts';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import type { ColumnDef } from '@tanstack/react-table';

const formSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido').optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip_code: z.string().optional(),
    description: z.string().optional(),
});

const columns: ColumnDef<App.Data.SupplierData>[] = [
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Telefone',
    },
    {
        accessorKey: 'address',
        header: 'Endereço',
    },
    {
        accessorKey: 'city',
        header: 'Cidade',
    },
    {
        accessorKey: 'state',
        header: 'Estado',
    },
    {
        accessorKey: 'zip_code',
        header: 'CEP',
    },
];

function Index() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [isOpen, setIsOpen] = useState(false);
    const perPage = 10;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            description: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post(route('api.suppliers.create'), values);

            toast.success('Fornecedor criado com sucesso');
            setIsOpen(false);
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['suppliers', page, perPage, search, sortBy, sortDirection] });
        } catch {
            toast.error('Erro ao criar fornecedor');
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['suppliers', page, perPage, search, sortBy, sortDirection],
        queryFn: async () => {
            const q = query(route('api.suppliers.get'))
                .page(page)
                .param('per_page', perPage.toString())
                .param('sort', sortBy)
                .param('sort_direction', sortDirection);

            if (search) {
                q.filter('search', search);
            }

            const response = await axios.get<PaginatedResponse<App.Data.SupplierData>>(q.build());
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
            <Head title="Fornecedores" />

            <div className="flex w-full justify-center py-6">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Fornecedores</CardTitle>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>Novo Fornecedor</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Novo Fornecedor</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Telefone</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Endereço</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cidade</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Estado</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="zip_code"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CEP</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
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
                            searchPlaceholder="Pesquisar por nome, CNPJ, email ou telefone..."
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Index; 