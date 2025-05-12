<?php

namespace App\Data;

use App\Models\PatientBiologicalMetric;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class PatientBiologicalMetricData extends Data
{
    public function __construct(
        public string $id,
        public string $metric_type,
        public float $value,
        public string $unit,
        public ?string $notes = null,
    ) {}

    public static function make(PatientBiologicalMetric $metric): self
    {
        return new self(
            id: $metric->id,
            metric_type: $metric->metric_type,
            value: $metric->value,
            unit: $metric->unit,
            notes: $metric->notes,
        );
    }
}
