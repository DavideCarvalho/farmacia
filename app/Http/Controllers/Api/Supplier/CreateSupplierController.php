<?php

namespace App\Http\Controllers\Api\Supplier;

use App\Http\Controllers\Controller;
use App\Data\SupplierData;
use App\Models\Supplier;
use Illuminate\Http\Request;

class CreateSupplierController extends Controller
{
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:suppliers,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:2',
            'zip_code' => 'nullable|string|max:9',
            'description' => 'nullable|string',
        ]);

        $supplier = Supplier::create($data);

        return response()->json(SupplierData::make($supplier));
    }
}
