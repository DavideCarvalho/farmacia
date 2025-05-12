<?php

namespace App\Data;

use App\Models\PatientApplication;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PatientApplicationData extends Data
{
    public function __construct(
        public string $id,
        public string $patient_id,
        public string $product_id,
        public int $quantity,
        public string $application_date,
        public ?string $notes,
        public string $created_at,
        public string $updated_at,
        public ?PatientData $patient,
        public ?ProductData $product,
    ) {}

    public static function make(PatientApplication $patientApplication): self
    {
        return new self(
            id: $patientApplication->id,
            patient_id: $patientApplication->patient_id,
            product_id: $patientApplication->product_id,
            quantity: $patientApplication->quantity,
            application_date: $patientApplication->application_date,
            notes: $patientApplication->notes,
            created_at: $patientApplication->created_at,
            updated_at: $patientApplication->updated_at,
            patient: $patientApplication->patient ? PatientData::make($patientApplication->patient) : null,
            product: $patientApplication->product ? ProductData::make($patientApplication->product) : null,
        );
    }
}
