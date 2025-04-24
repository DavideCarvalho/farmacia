import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';
import { route } from 'ziggy-js';

export function ExpiringMedicinesCard() {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard', 'expiring-medicines'],
        queryFn: async () => {
            const response = await axios.get<App.Data.Dashboard.ExpiringMedicineData[]>(route('api.dashboard.expiring-medicines'));
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
                    <h3 className="mb-3 text-lg font-semibold">Medicamentos Próximos da Validade</h3>
                    <p className="text-muted-foreground">Nenhum medicamento próximo da validade</p>
                </div>
            </div>
        );
    }

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="mb-3 text-lg font-semibold">Medicamentos Próximos da Validade</h3>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-orange-500">
                        <AlertTriangle className="h-5 w-5" />
                        <p className="text-3xl font-bold">{data.length}</p>
                    </div>
                    <p className="text-muted-foreground text-sm">Medicamentos próximos da validade</p>
                    <div className="mt-2 max-h-32 overflow-y-auto">
                        {data.map((medicine) => (
                            <div key={medicine.id} className="mb-2 rounded-lg bg-orange-500/10 p-2 text-sm">
                                <p className="font-medium">{medicine.productName}</p>
                                <p className="text-muted-foreground">Validade: {new Date(medicine.expirationDate).toLocaleDateString('pt-BR')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
