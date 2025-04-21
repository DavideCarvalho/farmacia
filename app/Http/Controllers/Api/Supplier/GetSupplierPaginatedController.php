<?php

namespace App\Http\Controllers\Api\Supplier;

use App\Http\Controllers\Controller;
use App\Data\SupplierData;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class GetSupplierPaginatedController extends Controller
{
    public function __invoke(Request $request)
    {
        $suppliers = QueryBuilder::for(Supplier::class)
            ->select('suppliers.*')
            ->allowedFilters([
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->where('name', 'ilike', "%{$value}%")
                            ->orWhere('cnpj', 'ilike', "%{$value}%")
                            ->orWhere('email', 'ilike', "%{$value}%")
                            ->orWhere('phone', 'ilike', "%{$value}%");
                    });
                }),
            ])
            ->allowedSorts([
                AllowedSort::field('name'),
                AllowedSort::field('cnpj'),
                AllowedSort::field('email'),
                AllowedSort::field('phone'),
                AllowedSort::field('created_at'),
            ])
            ->defaultSort('name')
            ->paginate(10)
            ->appends($request->query());

        $suppliersData = SupplierData::collect($suppliers);

        return response()->json($suppliersData);
    }
}
