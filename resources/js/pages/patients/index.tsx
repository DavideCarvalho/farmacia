import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { PaginatedResponse } from '@/types/pagination';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link } from '@inertiajs/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { query } from '@vortechron/query-builder-ts';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    cpf: z.string().min(1, 'CPF é obrigatório'),
    birth_date: z.string().min(1, 'Data de nascimento é obrigatória'),
    phone: z.string().min(1, 'Telefone é obrigatório'),
    address: z.string().min(1, 'Endereço é obrigatório'),
    medical_record: z.string().min(1, 'Prontuário médico é obrigatório'),
});

const columnHelper = createColumnHelper<App.Data.PatientData>();

const columns = [
    columnHelper.accessor('name', {
        header: 'Nome',
        cell: ({ row }) => {
            const name = row.getValue('name') as string;
            const id = row.original.id;
            return (
                // <Link href={route('web.patients.show', { id })} className="hover:underline">
                //     {name}
                // </Link>
                <Link href={''} className="hover:underline">
                    {name}
                </Link>
            );
        },
    }),
    columnHelper.accessor('cpf', {
        header: 'CPF',
    }),
    columnHelper.accessor('birth_date', {
        header: 'Data de Nascimento',
        cell: ({ row }) => {
            const date = row.getValue('birth_date') as string;
            return date ? new Date(date).toLocaleDateString() : '-';
        },
    }),
    columnHelper.accessor('phone', {
        header: 'Telefone',
    }),
    columnHelper.accessor('address', {
        header: 'Endereço',
    }),
    columnHelper.accessor('medical_record', {
        header: 'Prontuário',
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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post(route('api.patients.create'), values);

            toast.success('Paciente criado com sucesso');
            setIsOpen(false);
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['patients', page, perPage, search, sortBy, sortDirection] });
        } catch {
            toast.error('Erro ao criar paciente');
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ['patients', page, perPage, search, sortBy, sortDirection],
        queryFn: async () => {
            const q = query(route('api.patients.get'))
                .page(page)
                .param('per_page', perPage.toString())
                .param('sort', sortBy)
                .param('sort_direction', sortDirection);

            if (search) {
                q.filter('search', search);
            }

            const response = await axios.get<PaginatedResponse<App.Data.PatientData>>(q.build());
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
            <Head title="Pacientes" />

            <div className="flex w-full justify-center py-6">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Pacientes</CardTitle>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>Novo Paciente</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Novo Paciente</DialogTitle>
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
                                            name="cpf"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CPF</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="birth_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Data de Nascimento</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
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
                                            name="medical_record"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Prontuário Médico</FormLabel>
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
                            searchPlaceholder="Pesquisar por nome, CPF ou telefone..."
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Index;
