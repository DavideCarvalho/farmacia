<?php

namespace App\Data;

use App\Models\User;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
    ) {}

    public static function make(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
        );
    }
}
