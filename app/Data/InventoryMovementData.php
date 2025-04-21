<?php

namespace App\Data;

use App\Enums\InventoryMovementType;
use App\Models\InventoryMovement;
use Illuminate\Contracts\Support\Arrayable;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\Validation\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class InventoryMovementData extends Data implements Arrayable
{
    public function __construct(
        public readonly ?int $id,
        public readonly int $product_id,
        public readonly InventoryMovementType $type,
        public readonly int $quantity,
        public readonly float $unit_price,
        public readonly string $reason,
        public readonly string $created_at,
        public readonly ?ProductData $product,
        public readonly ?UserData $user,
    ) {
    }

    public static function make(InventoryMovement $movement): self
    {
        return new self(
            id: $movement->id,
            product_id: $movement->product_id,
            type: $movement->type,
            quantity: (int) $movement->quantity,
            unit_price: (int) $movement->unit_price,
            reason: $movement->reason,
            created_at: $movement->created_at->toDateTimeString(),
            product: $movement->product ? ProductData::make($movement->product) : null,
            user: $movement->user ? UserData::make($movement->user) : null,
        );
    }
}
