<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'cpf',
        'birth_date',
        'phone',
        'address',
        'medical_record',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function applications(): HasMany
    {
        return $this->hasMany(PatientApplication::class);
    }

    public function rooms(): BelongsToMany
    {
        return $this->belongsToMany(Room::class)
            ->withPivot(['check_in_at', 'check_out_at', 'notes'])
            ->withTimestamps();
    }

    public function getCurrentRoom(): ?Room
    {
        return $this->rooms()
            ->whereNull('patient_room.check_out_at')
            ->first();
    }
} 