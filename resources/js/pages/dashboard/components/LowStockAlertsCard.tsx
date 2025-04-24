import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';
import { route } from 'ziggy-js';

export function LowStockAlertsCard() {
    const { data, isLoading } = useQuery({
        queryKey: ['dashboard', 'low-stock-alerts'],
        queryFn: async () => {
            const response = await axios.get(route('api.dashboard.low-stock-alerts'));
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

    if (!data || data.total_alerts === 0) {
        return (
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="mb-3 text-lg font-semibold">Alertas de Estoque</h3>
                    <p className="text-muted-foreground">Nenhum alerta de estoque baixo</p>
                </div>
            </div>
        );
    }

    return (
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="mb-3 text-lg font-semibold">Alertas de Estoque</h3>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-yellow-500">
                        <AlertTriangle className="h-5 w-5" />
                        <p className="text-3xl font-bold">{data.total_alerts}</p>
                    </div>
                    <p className="text-muted-foreground text-sm">Itens com estoque baixo</p>
                    <div className="mt-2 max-h-32 overflow-y-auto">
                        {data.low_stock_items.map((item) => (
                            <div key={item.id} className="mb-2 rounded-lg bg-yellow-500/10 p-2 text-sm">
                                <p className="font-medium">{item.product_name}</p>
                                <p className="text-muted-foreground">
                                    {item.remaining_quantity} / {item.minimum_quantity} em {item.department_name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 