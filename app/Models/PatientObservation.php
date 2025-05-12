<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PatientObservation extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    public $timestamps = true;

    protected $fillable = [
        'patient_hospital_stay_id',
        'user_id',
        'observation',
        'observation_type', // e.g., 'medical', 'pharmaceutical', 'nursing'
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * Get the patient hospital stay that this observation belongs to.
     */
    public function patientHospitalStay(): BelongsTo
    {
        return $this->belongsTo(PatientHospitalStay::class);
    }

    /**
     * Get the healthcare professional who made this observation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the biological metrics associated with this observation.
     */
    public function biologicalMetrics(): HasMany
    {
        return $this->hasMany(PatientBiologicalMetric::class, 'patient_observation_id');
    }
}
