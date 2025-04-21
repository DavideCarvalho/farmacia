<?php

namespace Database\Seeders;

use App\Enums\InventoryItemType;
use App\Enums\UnitOfMeasurement;
use App\Models\Department;
use App\Models\InventoryItem;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class InventoryItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obter o primeiro departamento
        $department = Department::first();

        if (!$department) {
            $department = Department::create([
                'name' => 'Farmácia Central',
                'description' => 'Departamento principal da farmácia',
            ]);
        }

        // Itens de inventário de exemplo
        $inventoryItems = [
            // Sólidos
            [
                'product_id' => Product::where('name', 'Dipirona 500mg')->first()->id,
                'department_id' => $department->id,
                'type' => InventoryItemType::MEDICINE,
                'quantity' => 100,
                'remaining_quantity' => 100,
                'unit_price' => 2.50,
                'lot_number' => 'LOT001',
                'expiration_date' => now()->addMonths(12),
                'status' => 'available',
            ],
            [
                'product_id' => Product::where('name', 'Paracetamol 500mg')->first()->id,
                'department_id' => $department->id,
                'type' => InventoryItemType::MEDICINE,
                'quantity' => 50,
                'remaining_quantity' => 50,
                'unit_price' => 3.00,
                'lot_number' => 'LOT002',
                'expiration_date' => now()->addMonths(18),
                'status' => 'available',
            ],

            // Líquidos
            [
                'product_id' => Product::where('name', 'Soro Fisiológico 500ml')->first()->id,
                'department_id' => $department->id,
                'type' => InventoryItemType::MEDICINE,
                'quantity' => 30,
                'remaining_quantity' => 30,
                'unit_price' => 5.00,
                'lot_number' => 'LOT003',
                'expiration_date' => now()->addMonths(6),
                'status' => 'available',
            ],
            [
                'product_id' => Product::where('name', 'Álcool 70% 1L')->first()->id,
                'department_id' => $department->id,
                'type' => InventoryItemType::MEDICINE,
                'quantity' => 20,
                'remaining_quantity' => 20,
                'unit_price' => 15.00,
                'lot_number' => 'LOT004',
                'expiration_date' => now()->addMonths(24),
                'status' => 'available',
            ],
        ];

        foreach ($inventoryItems as $itemData) {
            InventoryItem::create($itemData);
        }
    }
}
