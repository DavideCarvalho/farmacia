<?php

namespace App\Data;

use App\Models\PatientHospitalStay;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Illuminate\Database\Eloquent\Collection;

#[TypeScript]
class PatientHospitalStayData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly int $patient_id,
        public readonly string $entry_at,
        public readonly ?string $exit_at,
        public readonly ?string $notes,
        public readonly string $created_at,
        public readonly string $updated_at,
        /** @var PatientObservationData[] */
        public readonly Collection $observations,
    ) {}

    public static function make(PatientHospitalStay $stay): self
    {
        return new self(
            id: $stay->id,
            patient_id: $stay->patient_id,
            entry_at: $stay->entry_at->format('Y-m-d H:i:s'),
            exit_at: $stay->exit_at?->format('Y-m-d H:i:s'),
            notes: $stay->notes,
            created_at: $stay->created_at->format('Y-m-d H:i:s'),
            updated_at: $stay->updated_at->format('Y-m-d H:i:s'),
            observations: PatientObservationData::collect($stay->observations),
        );
    }
}
