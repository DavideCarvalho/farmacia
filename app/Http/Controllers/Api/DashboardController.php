<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function lowStockAlerts(): JsonResponse
    {
        $lowStockItems = InventoryItem::with(['product', 'department'])
            ->whereRaw('remaining_quantity <= minimum_quantity')
            ->where('status', 'available')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_name' => $item->product->name,
                    'department_name' => $item->department->name,
                    'remaining_quantity' => $item->remaining_quantity,
                    'minimum_quantity' => $item->minimum_quantity,
                    'unit_price' => $item->unit_price,
                    'lot_number' => $item->lot_number,
                ];
            });

        return response()->json([
            'low_stock_items' => $lowStockItems,
            'total_alerts' => $lowStockItems->count(),
        ]);
    }
} 