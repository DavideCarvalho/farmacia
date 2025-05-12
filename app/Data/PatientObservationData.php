<?php

namespace App\Data;

use App\Models\PatientObservation;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Illuminate\Database\Eloquent\Collection;
class PatientObservationData extends Data
{
  public function __construct(
    public int $id,
    public string $observation,
    public string $observation_type,
    public string $created_at,
    public UserData $user,
    #[DataCollectionOf(PatientBiologicalMetricData::class)]
    public Collection $biological_metrics,
  ) {}

  public static function make(PatientObservation $observation): self
  {
    return new self(
      id: $observation->id,
      observation: $observation->observation,
      observation_type: $observation->observation_type,
      created_at: $observation->created_at->format('Y-m-d H:i:s'),
      user: UserData::make($observation->user),
      biological_metrics: $observation->biologicalMetrics,
    );
  }
}
