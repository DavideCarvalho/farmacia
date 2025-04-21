<?php

namespace Database\Seeders;

use App\Enums\InventoryMovementType;
use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class InventoryMovementSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        $products = Product::all();

        foreach ($products as $product) {
            // Entrada de estoque
            InventoryMovement::create([
                'product_id' => $product->id,
                'type' => InventoryMovementType::ENTRY->value,
                'quantity' => 100,
                'unit_price' => 10.00,
                'reason' => 'Compra inicial',
                'user_id' => $user->id,
            ]);

            // Saída de estoque
            InventoryMovement::create([
                'product_id' => $product->id,
                'type' => InventoryMovementType::EXIT->value,
                'quantity' => 10,
                'unit_price' => 10.00,
                'reason' => 'Uso interno',
                'user_id' => $user->id,
            ]);
        }
    }
}
