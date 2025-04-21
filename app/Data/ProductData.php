<?php

namespace App\Data;

use App\Models\Product;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Illuminate\Validation\Rules\Enum;
use App\Enums\UnitOfMeasurement;

#[TypeScript]
class ProductData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $description,
        public string $barcode,
        public float $purchase_price,
        public float $selling_price,
        public int $quantity_in_stock,
        public int $minimum_quantity,
        public ?string $expiration_date,
        public ?string $batch_number,
        public int $category_id,
        public int $supplier_id,
        public bool $is_active,
        public ?UnitOfMeasurement $unit_of_measurement,
        public ?float $quantity_per_unit,
    ) {}

    public static function make(Product $product): self
    {
        return new self(
            id: $product->id,
            name: $product->name,
            description: $product->description,
            barcode: $product->barcode,
            purchase_price: $product->purchase_price,
            selling_price: $product->selling_price,
            quantity_in_stock: $product->quantity_in_stock,
            minimum_quantity: $product->minimum_quantity,
            expiration_date: $product->expiration_date?->toDateString(),
            batch_number: $product->batch_number,
            category_id: $product->category_id,
            supplier_id: $product->supplier_id,
            is_active: $product->is_active,
            unit_of_measurement: $product->unit_of_measurement,
            quantity_per_unit: $product->quantity_per_unit,
        );
    }
}
