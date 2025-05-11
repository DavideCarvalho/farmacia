<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
class Patient extends Model
{
    use HasFactory, SoftDeletes, HasSlug;

    protected $fillable = [
        'name',
        'cpf',
        'birth_date',
        'phone',
        'address',
        'medical_record',
        'slug',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

        /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

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

    public function hospitalStays(): HasMany
    {
        return $this->hasMany(PatientHospitalStay::class);
    }

    public function getCurrentStay(): ?PatientHospitalStay
    {
        return $this->hospitalStays()
            ->whereNull('exit_at')
            ->latest('entry_at')
            ->first();
    }
} 