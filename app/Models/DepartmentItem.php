<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class DepartmentItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'department_id',
        'inventory_item_id',
        'status',
        'used_at',
        'expired_at',
        'notes',
    ];

    protected $casts = [
        'used_at' => 'datetime',
        'expired_at' => 'datetime',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function inventoryItem(): BelongsTo
    {
        return $this->belongsTo(InventoryItem::class);
    }
}
