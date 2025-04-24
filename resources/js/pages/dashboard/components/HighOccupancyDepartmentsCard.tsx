import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { route } from 'ziggy-js';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function HighOccupancyDepartmentsCard() {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard', 'high-occupancy-departments'],
        queryFn: async () => {
            const response = await axios.get<App.Data.Dashboard.HighOccupancyDepartmentData[]>(route('api.dashboard.high-occupancy-departments'));
            return response.data;
        },
    });

    if (isLoading) {
        return (
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <Skeleton className="mb-3 h-7 w-48" />
                    <div className="flex flex-col items-center gap-2">
                        <Skeleton className="h-9 w-56" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="mb-3 text-lg font-semibold">Departamentos com Alta Ocupação</h3>
                    <p className="text-muted-foreground text-sm">Nenhum departamento com ocupação acima de 50%</p>
                </div>
            </div>
        );
    }

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <div className="absolute inset-0 flex flex-col p-4">
                <h3 className="mb-3 text-lg font-semibold">Departamentos com Alta Ocupação</h3>
                <div className="flex flex-col gap-2 overflow-y-auto">
                    {data.map((department) => (
                        <Alert key={department.id} variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{department.name}</AlertTitle>
                            <AlertDescription>
                                <div className="flex items-center justify-between">
                                    <span>Ocupação: {department.occupancyPercentage}%</span>
                                    <span>
                                        {department.totalOccupancy}/{department.totalCapacity} leitos
                                    </span>
                                </div>
                            </AlertDescription>
                        </Alert>
                    ))}
                </div>
            </div>
        </div>
    );
}
