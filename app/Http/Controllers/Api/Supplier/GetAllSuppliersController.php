<?php

namespace App\Http\Controllers\Api\Supplier;

use App\Data\SupplierData;
use App\Http\Controllers\Controller;
use App\Models\Supplier;

class GetAllSuppliersController extends Controller
{
    public function __invoke()
    {
        $suppliers = Supplier::orderBy('name')
            ->get()
            ->map(fn(Supplier $supplier) => SupplierData::make($supplier));

        return response()->json($suppliers);
    }
}
