<?php

namespace App\Data;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PatientData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $slug,
        public readonly string $name,
        public readonly string $cpf,
        public readonly string $birth_date,
        public readonly string $phone,
        public readonly string $address,
        public readonly string $medical_record,
        public readonly string $created_at,
        public readonly string $updated_at,
        /** @var PatientHospitalStayData[] */
        public readonly ?Collection $hospital_stays,
    ) {}

    public static function make(Patient $patient): self
    {
        $observations = collect();
        foreach ($patient->hospitalStays ?? [] as $stay) {
            $observations = $observations->concat($stay->observations ?? []);
        }

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
            hospital_stays: $patient->hospitalStays ? PatientHospitalStayData::collect($patient->hospitalStays) : null,
        );
    }
}
