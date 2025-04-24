<?php

namespace App\Data\Dashboard;

use App\Models\InventoryItem;
use Carbon\Carbon;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ExpiringMedicineData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $productName,
        public readonly Carbon $expirationDate,
        public readonly int $remainingQuantity,
        public readonly string $lotNumber,
    ) {
    }

    public static function make(InventoryItem $item): self
    {
        return new self(
            id: $item->id,
            productName: $item->product->name,
            expirationDate: $item->expiration_date,
            remainingQuantity: $item->remaining_quantity,
            lotNumber: $item->lot_number,
        );
    }
}
