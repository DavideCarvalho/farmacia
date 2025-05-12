import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertCircle, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
            <p className="text-red-500">Algo deu errado ao carregar os dados do paciente.</p>
            <Button onClick={resetErrorBoundary}>Tentar novamente</Button>
        </div>
    );
}

function LoadingFallback() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
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
                            <div key={stay.id} className="space-y-2 rounded-lg border p-4">
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
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                Em internação
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {stay.notes && <p className="text-sm text-gray-500">{stay.notes}</p>}
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
    const [metrics, setMetrics] = useState<
        Array<{
            id: string;
            metric_type: string;
            value: string;
            unit: string;
            notes?: string;
        }>
    >([]);

    const handleAddMetric = () => {
        setMetrics([
            ...metrics,
            {
                id: crypto.randomUUID(),
                metric_type: '',
                value: '',
                unit: '',
            },
        ]);
    };

    const handleMetricChange = (id: string, field: string, value: string) => {
        setMetrics(metrics.map((metric) => (metric.id === id ? { ...metric, [field]: value } : metric)));
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
                        <div className="flex items-center justify-between">
                            <Label>Métricas Biológicas</Label>
                            <Button variant="outline" size="sm" onClick={handleAddMetric}>
                                Adicionar Métrica
                            </Button>
                        </div>

                        {metrics.map((metric) => (
                            <div key={metric.id} className="grid grid-cols-4 gap-2 rounded border p-2">
                                <div>
                                    <Label>Tipo</Label>
                                    <Select value={metric.metric_type} onValueChange={(value) => handleMetricChange(metric.id, 'metric_type', value)}>
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
                                    <Select value={metric.unit} onValueChange={(value) => handleMetricChange(metric.id, 'unit', value)}>
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
                            <div key={observation.id} className="space-y-2 rounded-lg border p-4">
                                <div className="flex items-start justify-between">
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
                                                    <span className="font-medium">{metric.metric_type}:</span> {metric.value} {metric.unit}
                                                    {metric.notes && <span className="text-gray-500"> - {metric.notes}</span>}
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

function getMetricStatus(metricType: string, value: number): { status: 'normal' | 'warning' | 'danger'; message: string } {
    switch (metricType) {
        case 'blood_pressure': {
            const [systolic, diastolic] = value.toString().split('/').map(Number);
            if (systolic >= 180 || diastolic >= 120) {
                return { status: 'danger', message: 'Crise hipertensiva' };
            }
            if (systolic >= 140 || diastolic >= 90) {
                return { status: 'warning', message: 'Pressão elevada' };
            }
            if (systolic < 90 || diastolic < 60) {
                return { status: 'warning', message: 'Pressão baixa' };
            }
            return { status: 'normal', message: 'Normal' };
        }

        case 'heart_rate': {
            if (value > 100) {
                return { status: 'warning', message: 'Taquicardia' };
            }
            if (value < 60) {
                return { status: 'warning', message: 'Bradicardia' };
            }
            return { status: 'normal', message: 'Normal' };
        }

        case 'temperature': {
            if (value >= 38) {
                return { status: 'danger', message: 'Febre' };
            }
            if (value >= 37.3) {
                return { status: 'warning', message: 'Febrícula' };
            }
            if (value < 35) {
                return { status: 'warning', message: 'Hipotermia' };
            }
            return { status: 'normal', message: 'Normal' };
        }

        case 'oxygen_saturation': {
            if (value < 90) {
                return { status: 'danger', message: 'Hipoxemia' };
            }
            if (value < 95) {
                return { status: 'warning', message: 'Saturação baixa' };
            }
            return { status: 'normal', message: 'Normal' };
        }

        case 'blood_glucose': {
            if (value > 180) {
                return { status: 'danger', message: 'Hiperglicemia' };
            }
            if (value < 70) {
                return { status: 'danger', message: 'Hipoglicemia' };
            }
            return { status: 'normal', message: 'Normal' };
        }

        default:
            return { status: 'normal', message: 'Normal' };
    }
}

function getTrendIcon(previousValue: number, currentValue: number) {
    if (currentValue > previousValue) {
        return <TrendingUp className="h-4 w-4 text-red-500" />;
    }
    if (currentValue < previousValue) {
        return <TrendingDown className="h-4 w-4 text-green-500" />;
    }
    return <Minus className="h-4 w-4 text-gray-500" />;
}

function PatientMetricsSummary({ patient }: { patient: App.Data.PatientData }) {
    // Coletar todas as métricas de todas as observações
    const allMetrics = patient.hospital_stays
        ?.flatMap((stay) => stay.observations ?? [])
        .flatMap((observation) => observation.biological_metrics ?? [])
        // .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    // Agrupar por tipo e pegar a mais recente de cada
    const latestMetrics = allMetrics?.reduce(
        (acc, metric) => {
            if (!acc[metric.metric_type]) {
                acc[metric.metric_type] = metric;
            }
            return acc;
        },
        {} as Record<string, App.Data.PatientBiologicalMetricData>,
    );

    // Pegar a segunda mais recente de cada tipo para comparação
    const previousMetrics = allMetrics?.reduce(
        (acc, metric) => {
            if (!acc[metric.metric_type] && metric !== latestMetrics?.[metric.metric_type]) {
                acc[metric.metric_type] = metric;
            }
            return acc;
        },
        {} as Record<string, App.Data.PatientBiologicalMetricData>,
    );

    if (!latestMetrics || Object.keys(latestMetrics).length === 0) {
        return null;
    }

    const criticalMetrics = Object.entries(latestMetrics)
        .map(([type, metric]) => {
            const status = getMetricStatus(type, metric.value);
            return { type, metric, status };
        })
        .filter(({ status }) => status.status === 'danger');

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(latestMetrics).map(([type, metric]) => {
                    const status = getMetricStatus(type, metric.value);
                    const previousMetric = previousMetrics?.[type];
                    const trendIcon = previousMetric ? getTrendIcon(previousMetric.value, metric.value) : null;

                    return (
                        <Card key={type}>
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center justify-between text-sm font-medium">
                                    <span>
                                        {type === 'blood_pressure' && 'Pressão Arterial'}
                                        {type === 'heart_rate' && 'Frequência Cardíaca'}
                                        {type === 'temperature' && 'Temperatura'}
                                        {type === 'oxygen_saturation' && 'Saturação de O₂'}
                                        {type === 'blood_glucose' && 'Glicemia'}
                                    </span>
                                    {trendIcon}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {metric.value} {metric.unit}
                                </div>
                                <p
                                    className={`text-sm ${
                                        status.status === 'danger'
                                            ? 'text-red-500'
                                            : status.status === 'warning'
                                              ? 'text-yellow-500'
                                              : 'text-green-500'
                                    }`}
                                >
                                    {status.message}
                                </p>
                                {/* <p className="mt-1 text-xs text-gray-500">
                                    {format(new Date(metric.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                                </p> */}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {criticalMetrics.length > 0 && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Atenção</AlertTitle>
                    <AlertDescription>
                        {criticalMetrics.map(({ type, metric, status }) => (
                            <div key={type} className="mt-1">
                                {type === 'blood_pressure' && 'Pressão Arterial'}
                                {type === 'heart_rate' && 'Frequência Cardíaca'}
                                {type === 'temperature' && 'Temperatura'}
                                {type === 'oxygen_saturation' && 'Saturação de O₂'}
                                {type === 'blood_glucose' && 'Glicemia'}: {metric.value} {metric.unit} - {status.message}
                            </div>
                        ))}
                    </AlertDescription>
                </Alert>
            )}
        </div>
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Detalhes do Paciente</h2>
                        <div className="space-x-2">
                            <ObservationModal patientId={patient.id} onSuccess={() => refetch()} />
                            <Button variant="outline" onClick={() => window.history.back()}>
                                Voltar
                            </Button>
                        </div>
                    </div>

                    <PatientMetricsSummary patient={patient} />

                    <Tabs defaultValue="info" className="mt-6 space-y-4">
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
