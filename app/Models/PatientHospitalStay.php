<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PatientHospitalStay extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    public $timestamps = true;

    protected $fillable = [
        'patient_id',
        'entry_at',
        'exit_at',
        'notes',
    ];

    protected $casts = [
        'entry_at' => 'datetime',
        'exit_at' => 'datetime',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function observations(): HasMany
    {
        return $this->hasMany(PatientObservation::class);
    }
}
