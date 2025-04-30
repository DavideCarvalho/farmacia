import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { route } from 'ziggy-js';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

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
                    <div className="flex flex-col items-center gap-4">
                        <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/20">
                            <AlertCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-muted-foreground text-sm">Nenhum departamento com ocupação acima de 50%</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <div className="absolute inset-0 flex flex-col p-4">
                <h3 className="mb-4 text-lg font-semibold">Departamentos com Alta Ocupação</h3>
                <div className="flex flex-col gap-4 overflow-y-auto">
                    {data.map((department) => (
                        <div
                            key={department.id}
                            className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20"
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                <h4 className="font-medium text-red-900 dark:text-red-300">{department.name}</h4>
                            </div>
                            <div className="mb-2">
                                <Progress
                                    value={department.occupancyPercentage}
                                    className={cn(
                                        "h-2 bg-red-200 dark:bg-red-950",
                                        department.occupancyPercentage >= 90 ? "bg-red-200" : "bg-orange-200"
                                    )}
                                />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-medium text-red-700 dark:text-red-400">
                                    {department.occupancyPercentage}% ocupado
                                </span>
                                <span className="text-red-600/80 dark:text-red-400/80">
                                    {department.totalOccupancy}/{department.totalCapacity} leitos
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
