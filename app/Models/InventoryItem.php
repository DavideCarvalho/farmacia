<?php

namespace App\Models;

use App\Enums\InventoryItemType;
use App\Enums\UnitOfMeasurement;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class InventoryItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'department_id',
        'type',
        'quantity',
        'remaining_quantity',
        'unit_price',
        'lot_number',
        'expiration_date',
        'status',
    ];

    protected $casts = [
        'type' => InventoryItemType::class,
        'quantity' => 'decimal:2',
        'remaining_quantity' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'expiration_date' => 'date',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function movements(): HasMany
    {
        return $this->hasMany(InventoryMovement::class);
    }
}
