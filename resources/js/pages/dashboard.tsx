import { LowStockAlertsCard } from '@/pages/dashboard/components/LowStockAlertsCard';
import { ExpiringMedicinesCard } from '@/pages/dashboard/components/ExpiringMedicinesCard';
import { HighOccupancyDepartmentsCard } from '@/pages/dashboard/components/HighOccupancyDepartmentsCard';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function PotentialSavingsCard() {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard', 'potential-savings'],
        queryFn: async () => {
            const response = await axios.get<App.Data.PotentialSavingsData>(route('api.dashboard.potential-savings'));
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

    if (!data) {
        return <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border" />;
    }

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="mb-3 text-lg font-semibold">Potencial de Economia</h3>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-3xl font-bold">{currencyFormatter.format(data?.total_savings ?? 0)}</p>
                    <div className={`flex items-center gap-1 ${data.is_higher_than_last_month ? 'text-green-500' : 'text-red-500'}`}>
                        {data.is_higher_than_last_month ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                        <span className="text-sm font-medium">
                            {Math.abs(((data.total_savings - data.last_month_savings) / data.last_month_savings) * 100).toFixed(1)}%
                        </span>
                    </div>
                    <p className="text-muted-foreground text-sm">Este mês</p>
                    <p className="text-muted-foreground text-sm">
                        {data.unused_products_count} {data.unused_products_count === 1 ? 'remédio subutilizado' : 'remédios subutilizados'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <LowStockAlertsCard />
                    <PotentialSavingsCard />
                    <ExpiringMedicinesCard />
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <HighOccupancyDepartmentsCard />
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
