<?php

namespace App\Http\Controllers\Api\InventoryMovement;

use App\Http\Controllers\Controller;

use App\Data\InventoryMovementData;
use App\Models\InventoryMovement;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class GetInventoryMovementPaginatedController extends Controller
{
    public function __invoke(Request $request)
    {
        $movements = QueryBuilder::for(InventoryMovement::class)
            ->join('products', 'products.id', '=', 'inventory_movements.product_id')
            ->join('users', 'users.id', '=', 'inventory_movements.user_id')
            ->select('inventory_movements.*')
            ->with(['product', 'user'])
            ->allowedFilters([
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->whereHas('product', function ($query) use ($value) {
                            $query->where('name', 'ilike', "%{$value}%");
                        })
                            ->orWhere('reason', 'ilike', "%{$value}%")
                            ->orWhereHas('user', function ($query) use ($value) {
                                $query->where('name', 'ilike', "%{$value}%");
                            });
                    });
                }),
                AllowedFilter::exact('type'),
            ])
            ->allowedSorts([
                AllowedSort::field('created_at'),
                AllowedSort::field('type'),
                AllowedSort::field('quantity'),
                AllowedSort::field('unit_price'),
                AllowedSort::field('reason'),
                AllowedSort::field('product.name', 'products.name'),
                AllowedSort::field('user.name', 'users.name'),
            ])
            ->defaultSort('-created_at')
            ->paginate(10)
            ->appends($request->query());

        $movementsData = InventoryMovementData::collect($movements);

        return response()->json($movementsData);
    }
}
