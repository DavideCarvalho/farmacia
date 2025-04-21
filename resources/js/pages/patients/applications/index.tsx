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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    patient_id: z.string().min(1, 'Paciente é obrigatório'),
    product_id: z.string().min(1, 'Produto é obrigatório'),
    quantity: z.string().min(1, 'Quantidade é obrigatória'),
    application_date: z.string().min(1, 'Data de aplicação é obrigatória'),
    notes: z.string().optional(),
});

const columnHelper = createColumnHelper<App.Data.PatientApplicationData>();

const columns = [
    columnHelper.accessor((row) => row.patient?.name, {
        id: 'patient.name',
        header: 'Paciente',
    }),
    columnHelper.accessor((row) => row.product?.name, {
        id: 'product.name',
        header: 'Produto',
    }),
    columnHelper.accessor('quantity', {
        header: 'Quantidade',
    }),
    columnHelper.accessor('application_date', {
        header: 'Data de Aplicação',
        cell: ({ row }) => {
            const date = row.getValue('application_date') as string;
            return date ? new Date(date).toLocaleDateString() : '-';
        },
    }),
    columnHelper.accessor('notes', {
        header: 'Observações',
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
    const [selectedProduct, setSelectedProduct] = useState<App.Data.ProductData | null>(null);

    const { data: patients } = useQuery({
        queryKey: ['patients'],
        queryFn: async () => {
            const response = await axios.get<App.Data.PatientData[]>(route('api.patients.get-all'));
            return response.data;
        },
    });

    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get<App.Data.ProductData[]>(route('api.products.get-all'));
            return response.data;
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post(route('api.patient-applications.create'), values);

            toast.success('Aplicação criada com sucesso');
            setIsOpen(false);
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['patient-applications', page, perPage, search, sortBy, sortDirection] });
        } catch {
            toast.error('Erro ao criar aplicação');
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['patient-applications', page, perPage, search, sortBy, sortDirection],
        queryFn: async () => {
            const q = query(route('api.patient-applications.get'))
                .page(page)
                .param('per_page', perPage.toString())
                .param('sort', sortBy)
                .param('sort_direction', sortDirection);

            if (search) {
                q.filter('search', search);
            }

            const response = await axios.get<PaginatedResponse<App.Data.PatientApplicationData>>(q.build());
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
            <Head title="Aplicações de Pacientes" />

            <div className="flex w-full justify-center py-6">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Aplicações de Pacientes</CardTitle>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>Nova Aplicação</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Nova Aplicação</DialogTitle>
                                </DialogHeader>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="patient_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Paciente</FormLabel>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                        }}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione um paciente" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {patients?.map((patient) => (
                                                                <SelectItem key={patient.id} value={patient.id.toString()}>
                                                                    {patient.name}
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
                                            name="product_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Produto</FormLabel>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                            const product = products?.find(p => p.id.toString() === value);
                                                            setSelectedProduct(product || null);
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
                                                    <FormLabel>
                                                        {selectedProduct?.unit_of_measurement 
                                                            ? `Quantos ${selectedProduct.unit_of_measurement} foram aplicados?`
                                                            : 'Quantos foram aplicados?'}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input type="number" step="0.01" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="application_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Data de Aplicação</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="notes"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Observações</FormLabel>
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
                            searchPlaceholder="Pesquisar por paciente, produto ou data..."
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Index; 