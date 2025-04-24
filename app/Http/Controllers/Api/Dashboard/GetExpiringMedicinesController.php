<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Data\Dashboard\ExpiringMedicineData;
use App\Enums\ProductType;
use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class GetExpiringMedicinesController extends Controller
{
    public function __invoke(): JsonResponse
    {
        // Get medicines that will expire in the next 30 days
        $expiringMedicines = InventoryItem::with(['product'])
            ->whereHas('product', function ($query) {
                $query->where('type', ProductType::MEDICINE);
            })
            ->where('status', 'available')
            ->whereNotNull('expiration_date')
            ->where('expiration_date', '<=', Carbon::now()->addDays(30))
            ->where('expiration_date', '>', Carbon::now())
            ->get();

        $expiringMedicinesData = $expiringMedicines->map(fn ($item) => ExpiringMedicineData::make($item));

        return response()->json($expiringMedicinesData);
    }
}
