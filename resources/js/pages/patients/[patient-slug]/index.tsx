import { Suspense, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import AppLayout from '@/layouts/app-layout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
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

function HospitalStays({ stays }: { stays: App.Data.PatientHospitalStayData[] }) {
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

function ObservationModal({ patientId, onSuccess }: { patientId: number; onSuccess: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [observation, setObservation] = useState('');
  const [observationType, setObservationType] = useState('');
  const [metrics, setMetrics] = useState<Array<{
    id: string;
    metric_type: string;
    value: string;
    unit: string;
    notes?: string;
  }>>([]);

  const handleAddMetric = () => {
    setMetrics([...metrics, { 
      id: crypto.randomUUID(),
      metric_type: '', 
      value: '', 
      unit: '' 
    }]);
  };

  const handleMetricChange = (id: string, field: string, value: string) => {
    setMetrics(metrics.map(metric => 
      metric.id === id ? { ...metric, [field]: value } : metric
    ));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(route('api.patients.observations.store', { patient: patientId }), {
        observation,
        observation_type: observationType,
        metrics,
      });
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Error saving observation:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar Observação</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Observação</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="observationType">Tipo de Observação</Label>
            <Select value={observationType} onValueChange={setObservationType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Médica</SelectItem>
                <SelectItem value="nursing">Enfermagem</SelectItem>
                <SelectItem value="pharmaceutical">Farmacêutica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="observation">Observação</Label>
            <Textarea
              id="observation"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Digite sua observação..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Métricas Biológicas</Label>
              <Button variant="outline" size="sm" onClick={handleAddMetric}>
                Adicionar Métrica
              </Button>
            </div>

            {metrics.map((metric) => (
              <div key={metric.id} className="grid grid-cols-4 gap-2 p-2 border rounded">
                <div>
                  <Label>Tipo</Label>
                  <Select
                    value={metric.metric_type}
                    onValueChange={(value) => handleMetricChange(metric.id, 'metric_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blood_pressure">Pressão Arterial</SelectItem>
                      <SelectItem value="heart_rate">Frequência Cardíaca</SelectItem>
                      <SelectItem value="temperature">Temperatura</SelectItem>
                      <SelectItem value="oxygen_saturation">Saturação de O₂</SelectItem>
                      <SelectItem value="blood_glucose">Glicemia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Valor</Label>
                  <Input
                    type="number"
                    value={metric.value}
                    onChange={(e) => handleMetricChange(metric.id, 'value', e.target.value)}
                    placeholder="Valor"
                  />
                </div>
                <div>
                  <Label>Unidade</Label>
                  <Select
                    value={metric.unit}
                    onValueChange={(value) => handleMetricChange(metric.id, 'unit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mmHg">mmHg</SelectItem>
                      <SelectItem value="bpm">bpm</SelectItem>
                      <SelectItem value="°C">°C</SelectItem>
                      <SelectItem value="%">%</SelectItem>
                      <SelectItem value="mg/dL">mg/dL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notas</Label>
                  <Input
                    value={metric.notes || ''}
                    onChange={(e) => handleMetricChange(metric.id, 'notes', e.target.value)}
                    placeholder="Notas opcionais"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Salvar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ObservationsList({ observations }: { observations: App.Data.PatientObservationData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Observações</CardTitle>
      </CardHeader>
      <CardContent>
        {observations.length === 0 ? (
          <p className="text-gray-500">Nenhuma observação registrada.</p>
        ) : (
          <div className="space-y-4">
            {observations.map((observation) => (
              <div key={observation.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">
                      {format(new Date(observation.created_at), 'dd/MM/yyyy HH:mm', {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      Por: {observation.user.name} - {observation.observation_type}
                    </p>
                  </div>
                </div>
                <p className="text-sm">{observation.observation}</p>
                {observation.biological_metrics?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm font-medium">Métricas:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {observation.biological_metrics.map((metric: App.Data.PatientBiologicalMetricData) => (
                        <div key={metric.id} className="text-sm">
                          <span className="font-medium">{metric.metric_type}:</span>{' '}
                          {metric.value} {metric.unit}
                          {metric.notes && (
                            <span className="text-gray-500"> - {metric.notes}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
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
  const { data: patient, refetch } = useSuspenseQuery({
    queryKey: ['patient', slug],
    queryFn: async () => {
      const response = await axios.get<App.Data.PatientData>(route('api.patients.get-by-slug', { slug }));
      return response.data;
    },
  });

  return (
    <>
      <Head title={`Paciente - ${patient.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Detalhes do Paciente
            </h2>
            <div className="space-x-2">
              <ObservationModal patientId={patient.id} onSuccess={() => refetch()} />
              <Button variant="outline" onClick={() => window.history.back()}>
                Voltar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="info" className="space-y-4">
            <TabsList>
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="hospital-stays">Internações</TabsTrigger>
              <TabsTrigger value="observations">Observações</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <PatientInfo patient={patient} />
            </TabsContent>

            <TabsContent value="hospital-stays">
              <HospitalStays stays={patient.hospital_stays ?? []} />
            </TabsContent>

            <TabsContent value="observations">
              <ObservationsList observations={patient.observations ?? []} />
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