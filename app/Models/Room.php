<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Room extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    public $timestamps = true;

    protected $fillable = [
        'name',
        'number',
        'capacity',
        'department_id',
        'description',
    ];

    protected $casts = [
        'capacity' => 'integer',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function patients(): BelongsToMany
    {
        return $this->belongsToMany(Patient::class)
            ->withPivot(['check_in_at', 'check_out_at', 'notes'])
            ->withTimestamps();
    }

    public function getCurrentOccupancy(): int
    {
        return $this->patients()
            ->whereNull('patient_room.check_out_at')
            ->count();
    }

    public function isAvailable(): bool
    {
        return $this->getCurrentOccupancy() < $this->capacity;
    }

    public function getAvailableSpots(): int
    {
        return max(0, $this->capacity - $this->getCurrentOccupancy());
    }

    public function incrementOccupancy(int $amount = 1): bool
    {
        if ($this->getCurrentOccupancy() + $amount > $this->capacity) {
            return false;
        }

        $this->increment('current_occupancy', $amount);
        return true;
    }

    public function decrementOccupancy(int $amount = 1): bool
    {
        if ($this->getCurrentOccupancy() - $amount < 0) {
            return false;
        }

        $this->decrement('current_occupancy', $amount);
        return true;
    }
}
