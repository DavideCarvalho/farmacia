<?php

namespace App\Data;

use App\Models\Supplier;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class SupplierData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly ?string $email,
        public readonly ?string $phone,
        public readonly ?string $address,
        public readonly ?string $city,
        public readonly ?string $state,
        public readonly ?string $zip_code,
        public readonly ?string $description,
        public readonly bool $is_active,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {}

    public static function make(Supplier $supplier): self
    {
        return new self(
            id: $supplier->id,
            name: $supplier->name,
            email: $supplier->email,
            phone: $supplier->phone,
            address: $supplier->address,
            city: $supplier->city,
            state: $supplier->state,
            zip_code: $supplier->zip_code,
            description: $supplier->description,
            is_active: $supplier->is_active,
            created_at: $supplier->created_at->toIso8601String(),
            updated_at: $supplier->updated_at->toIso8601String(),
        );
    }
}
