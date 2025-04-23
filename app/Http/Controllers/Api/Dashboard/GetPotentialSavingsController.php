<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Data\PotentialSavingsData;
use App\Enums\ProductType;
use App\Http\Controllers\Controller;
use App\Models\DepartmentItem;
use App\Models\PatientApplication;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetPotentialSavingsController extends Controller
{
    public function __invoke(Request $request)
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // Get all department items that are medicines
        $departmentItems = DepartmentItem::with(['inventoryItem.product'])
            ->whereHas('inventoryItem.product', function ($query) {
                $query->where('type', ProductType::MEDICINE);
            })
            ->where('status', 'available')
            ->get();

        $totalSavings = 0;
        $lastMonthSavings = 0;
        $unusedProductsCount = 0;
        $debug = [];

        foreach ($departmentItems as $item) {
            $product = $item->inventoryItem->product;
            $quantityPerUnit = $product->quantity_per_unit;
            
            // Get all applications for this department item in the current month
            $usedQuantity = PatientApplication::where('department_item_id', $item->id)
                ->whereBetween('application_date', [$startOfMonth, $endOfMonth])
                ->sum('quantity');

            $remainingQuantity = $quantityPerUnit - $usedQuantity;

            if ($remainingQuantity > 0) {
                $potentialSavings = $remainingQuantity * $product->selling_price;
                $totalSavings += $potentialSavings;
                $unusedProductsCount++;
            }

            // Get all applications for this department item in the last month
            $lastMonthUsedQuantity = PatientApplication::where('department_item_id', $item->id)
                ->whereBetween('application_date', [$startOfLastMonth, $endOfLastMonth])
                ->sum('quantity');

            $lastMonthRemainingQuantity = $quantityPerUnit - $lastMonthUsedQuantity;

            if ($lastMonthRemainingQuantity > 0) {
                $lastMonthPotentialSavings = $lastMonthRemainingQuantity * $product->selling_price;
                $lastMonthSavings += $lastMonthPotentialSavings;
            }

            $debug[] = [
                'product' => $product->name,
                'quantity_per_unit' => $quantityPerUnit,
                'used_quantity' => $usedQuantity,
                'remaining_quantity' => $remainingQuantity,
                'selling_price' => $product->selling_price,
                'potential_savings' => $potentialSavings,
                'last_month_used_quantity' => $lastMonthUsedQuantity,
                'last_month_remaining_quantity' => $lastMonthRemainingQuantity,
                'last_month_potential_savings' => $lastMonthPotentialSavings,
            ];
        }

        return response()->json(new PotentialSavingsData(
            $totalSavings,
            'R$',
            $lastMonthSavings,
            $totalSavings > $lastMonthSavings,
            $unusedProductsCount,
        ));
    }
}
