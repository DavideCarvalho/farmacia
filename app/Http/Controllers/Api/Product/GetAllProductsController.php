<?php

namespace App\Http\Controllers\Api\Product;

use App\Data\ProductData;
use App\Http\Controllers\Controller;
use App\Models\Product;

class GetAllProductsController extends Controller
{
    public function __invoke()
    {
        $products = Product::orderBy('name')
            ->get()
            ->map(fn (Product $product) => ProductData::make($product));

        return response()->json($products);
    }
}
