<?php

namespace App\Data;

use App\Models\PatientHospitalStay;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;


#[TypeScript]
class PatientHospitalStayData extends Data
{
    public function __construct(
        public readonly int $id,
        public readonly int $patient_id,
        #[WithCast(DateTimeInterfaceCast::class)]
        public readonly \DateTimeInterface $entry_at,
        #[WithCast(DateTimeInterfaceCast::class)]
        public readonly ?\DateTimeInterface $exit_at,
        public readonly ?string $notes,
        #[WithCast(DateTimeInterfaceCast::class)]
        public readonly \DateTimeInterface $created_at,
        #[WithCast(DateTimeInterfaceCast::class)]
        public readonly \DateTimeInterface $updated_at,
        public readonly ?PatientData $patient,
    ) {
    }

    public static function fromModel(PatientHospitalStay $stay): self
    {
        return new self(
            id: $stay->id,
            patient_id: $stay->patient_id,
            entry_at: $stay->entry_at,
            exit_at: $stay->exit_at,
            notes: $stay->notes,
            created_at: $stay->created_at,
            updated_at: $stay->updated_at,
            patient: $stay->relationLoaded('patient') ? PatientData::fromModel($stay->patient) : null,
        );
    }
} 