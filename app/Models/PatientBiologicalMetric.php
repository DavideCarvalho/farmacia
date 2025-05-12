<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PatientBiologicalMetric extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'patient_observation_id',
        'metric_type', // e.g., 'blood_pressure', 'heart_rate', 'temperature', 'oxygen_saturation', 'blood_glucose'
        'value',
        'unit', // e.g., 'mmHg', 'bpm', '°C', '%', 'mg/dL'
        'notes',
    ];

    protected $casts = [
        'value' => 'float',
    ];

    /**
     * Get the observation that this metric belongs to.
     */
    public function observation(): BelongsTo
    {
        return $this->belongsTo(PatientObservation::class, 'patient_observation_id');
    }
}
