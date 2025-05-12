<?php

namespace App\Data;

use App\Models\Department;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
#[TypeScript]
class DepartmentData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $code,
        public string $description,
        public string $created_at,
        public string $updated_at,
    ) {}

    public static function make(Department $department): self
    {
        return new self(
            id: $department->id,
            name: $department->name,
            code: $department->code,
            description: $department->description,
            created_at: $department->created_at->toDateTimeString(),
            updated_at: $department->updated_at->toDateTimeString(),
        );
    }
}
