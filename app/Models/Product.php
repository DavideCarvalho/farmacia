<?php

namespace App\Models;

use App\Enums\UnitOfMeasurement;
use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'barcode',
        'purchase_price',
        'selling_price',
        'unit_of_measurement',
        'quantity_per_unit',
        'quantity_in_stock',
        'minimum_quantity',
        'expiration_date',
        'batch_number',
        'category_id',
        'supplier_id',
        'is_active',
        'type',
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'quantity_per_unit' => 'decimal:2',
        'expiration_date' => 'date',
        'is_active' => 'boolean',
        'unit_of_measurement' => UnitOfMeasurement::class,
        'type' => ProductType::class,
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function inventoryMovements(): HasMany
    {
        return $this->hasMany(InventoryMovement::class);
    }
}
