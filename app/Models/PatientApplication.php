<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PatientApplication extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'patient_id',
        'product_id',
        'department_item_id',
        'quantity',
        'application_date',
        'notes',
    ];

    protected $casts = [
        'application_date' => 'datetime',
        'quantity' => 'integer',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function departmentItem(): BelongsTo
    {
        return $this->belongsTo(DepartmentItem::class);
    }
}
