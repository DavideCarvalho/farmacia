<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\InventoryItem;
use App\Models\Product;
use Illuminate\Database\Seeder;

class InventoryItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = Department::all();
        $products = Product::all();

        foreach ($departments as $department) {
            foreach ($products as $product) {
                InventoryItem::factory()->create([
                    'product_id' => $product->id,
                    'department_id' => $department->id,
                    'quantity' => rand(50, 200),
                    'remaining_quantity' => rand(50, 200),
                    'minimum_quantity' => rand(10, 30),
                    'unit_price' => rand(10, 1000) / 10,
                    'lot_number' => 'LOT' . rand(1000, 9999),
                    'expiration_date' => now()->addMonths(rand(1, 24)),
                    'status' => 'available',
                ]);
            }
        }
    }
}
