import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const formSchema = z.object({
  patient_id: z.string().min(1, 'Paciente é obrigatório'),
  entry_at: z.string().min(1, 'Data de entrada é obrigatória'),
  notes: z.string().optional(),
});

const columns: ColumnDef<App.Data.PatientHospitalStayData>[] = [
  {
    accessorKey: 'patient.name',
    header: 'Paciente',
  },
  {
    accessorKey: 'entry_at',
    header: 'Data de Entrada',
    cell: ({ row }) => format(new Date(row.original.entry_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }),
  },
  {
    accessorKey: 'exit_at',
    header: 'Data de Saída',
    cell: ({ row }) => row.original.exit_at ? format(new Date(row.original.exit_at), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : '-',
  },
  {
    accessorKey: 'notes',
    header: 'Observações',
  },
];

function Index() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('entry_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isOpen, setIsOpen] = useState(false);
  const perPage = 10;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient_id: '',
      entry_at: '',
      notes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(route('api.patients.hospital-stays.create'), values);

      toast.success('Internação registrada com sucesso');
      setIsOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['hospital-stays', page, perPage, search, status, sortBy, sortDirection] });
    } catch {
      toast.error('Erro ao registrar internação');
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ['hospital-stays', page, perPage, search, status, sortBy, sortDirection],
    queryFn: async () => {
      const q = query(route('api.patients.hospital-stays.get'))
        .page(page)
        .param('per_page', perPage.toString())
        .param('sort', sortBy)
        .param('sort_direction', sortDirection);

      if (search) {
        q.filter('search', search);
      }

      if (status) {
        q.filter('status', status);
      }

      const response = await axios.get<PaginatedResponse<App.Data.PatientHospitalStayData>>(q.build());
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
      <Head title="Internações Hospitalares" />

      <div className="flex w-full justify-center py-6">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Internações Hospitalares</CardTitle>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>Nova Internação</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nova Internação</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="patient_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Paciente</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um paciente" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* TODO: Adicionar lista de pacientes */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="entry_at"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Entrada</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
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
                            <Textarea {...field} />
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
            <div className="mb-4">
              {/* <Select value={status} onValueChange={(value) => {
                setStatus(value);
                setPage(1);
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="active">Em andamento</SelectItem>
                  <SelectItem value="completed">Finalizadas</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
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
              searchPlaceholder="Pesquisar por nome ou CPF do paciente..."
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Index.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export default Index; 