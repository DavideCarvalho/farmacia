<?php

namespace App\Data;

use App\Models\Patient;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\TypeScriptTransformer\Attributes\TypeScriptType;
#[TypeScript]
class PatientData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly string $slug,
        public readonly string $name,
        public readonly string $cpf,
        public readonly string $birth_date,
        public readonly string $phone,
        public readonly string $address,
        public readonly string $medical_record,
        public readonly string $created_at,
        public readonly string $updated_at,
        #[TypeScriptType([
            'id' => 'int',
            'patient_id' => 'int',
            'entry_at' => 'string',
            'exit_at' => 'string',
            'notes' => 'string',
            'created_at' => 'string',
            'updated_at' => 'string',
        ])]
        public readonly array $hospital_stays,
    ) {}

    public static function make(Patient $patient): self
    {
        return new self(
            id: $patient->id,
            slug: $patient->slug,
            name: $patient->name,
            cpf: $patient->cpf,
            birth_date: $patient->birth_date->format('Y-m-d'),
            phone: $patient->phone,
            address: $patient->address,
            medical_record: $patient->medical_record,
            created_at: $patient->created_at->format('Y-m-d H:i:s'),
            updated_at: $patient->updated_at->format('Y-m-d H:i:s'),
            hospital_stays: $patient->hospitalStays->map(fn ($stay) => [
                'id' => $stay->id,
                'patient_id' => $stay->patient_id,
                'entry_at' => $stay->entry_at->format('Y-m-d H:i:s'),
                'exit_at' => $stay->exit_at?->format('Y-m-d H:i:s'),
                'notes' => $stay->notes,
                'created_at' => $stay->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $stay->updated_at->format('Y-m-d H:i:s'),
            ])->toArray(),
        );
    }
}
