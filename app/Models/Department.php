<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'description',
    ];

    public function inventoryItems(): HasMany
    {
        return $this->hasMany(InventoryItem::class);
    }

    public function movements(): HasMany
    {
        return $this->hasMany(InventoryMovement::class);
    }

    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    public function getTotalCapacity(): int
    {
        return $this->rooms->sum('capacity');
    }

    public function getTotalOccupancy(): int
    {
        return $this->rooms->sum(function ($room) {
            return $room->patients()
                ->whereNull('patient_room.check_out_at')
                ->count();
        });
    }

    public function getAvailableSpots(): int
    {
        return $this->getTotalCapacity() - $this->getTotalOccupancy();
    }
}
