import { Suspense } from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery, useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import AppLayout from '@/layouts/app-layout';

interface HospitalStay {
  id: number;
  patient_id: number;
  entry_at: string;
  exit_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

function ErrorFallback({ resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <p className="text-red-500">Algo deu errado ao carregar os dados do paciente.</p>
      <Button onClick={resetErrorBoundary}>Tentar novamente</Button>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}

function PatientInfo({ patient }: { patient: App.Data.PatientData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nome</p>
            <p className="mt-1">{patient.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">CPF</p>
            <p className="mt-1">{patient.cpf}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Data de Nascimento</p>
            <p className="mt-1">
              {format(new Date(patient.birth_date), 'dd/MM/yyyy', {
                locale: ptBR,
              })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Telefone</p>
            <p className="mt-1">{patient.phone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium text-gray-500">Endereço</p>
            <p className="mt-1">{patient.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Prontuário</p>
            <p className="mt-1">{patient.medical_record}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HospitalStays({ stays }: { stays: HospitalStay[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Internações</CardTitle>
      </CardHeader>
      <CardContent>
        {stays.length === 0 ? (
          <p className="text-gray-500">Nenhuma internação registrada.</p>
        ) : (
          <div className="space-y-4">
            {stays.map((stay) => (
              <div
                key={stay.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Entrada:{' '}
                      {format(new Date(stay.entry_at), 'dd/MM/yyyy HH:mm', {
                        locale: ptBR,
                      })}
                    </p>
                    {stay.exit_at && (
                      <p className="text-sm font-medium">
                        Saída:{' '}
                        {format(new Date(stay.exit_at), 'dd/MM/yyyy HH:mm', {
                          locale: ptBR,
                        })}
                      </p>
                    )}
                  </div>
                  <div>
                    {!stay.exit_at && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Em internação
                      </span>
                    )}
                  </div>
                </div>
                {stay.notes && (
                  <p className="text-sm text-gray-500">{stay.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PatientContent({ slug }: { slug: string }) {
  const { data: patient } = useSuspenseQuery({
    queryKey: ['patient', slug],
    queryFn: async () => {
      const response = await axios.get<App.Data.PatientData>(route('api.patients.get-by-slug', { slug }));
      return response.data;
    },
  });

  const { data: hospitalStays } = useQuery({
    queryKey: ['hospital-stays', slug],
    queryFn: async () => {
      const response = await axios.get<{ data: HospitalStay[] }>(`/api/hospital-stays?patient_slug=${slug}`);
      return response.data.data;
    },
  });

  if (!patient || !hospitalStays) {
    return <LoadingFallback />;
  }

  return (
    <>
      <Head title={`Paciente - ${patient.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Detalhes do Paciente
            </h2>
            <Button variant="outline" onClick={() => window.history.back()}>
              Voltar
            </Button>
          </div>

          <Tabs defaultValue="info" className="space-y-4">
            <TabsList>
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="hospital-stays">Internações</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <PatientInfo patient={patient} />
            </TabsContent>

            <TabsContent value="hospital-stays">
              <HospitalStays stays={hospitalStays} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default function PatientBySlugPage({ slug }: { slug: string }) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<LoadingFallback />}>
        <PatientContent slug={slug} />
      </Suspense>
    </ErrorBoundary>
  );
}

PatientBySlugPage.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;