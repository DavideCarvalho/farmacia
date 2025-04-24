<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\InventoryItem;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class InventoryItemFactory extends Factory
{
    protected $model = InventoryItem::class;

    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'department_id' => Department::factory(),
            'quantity' => $this->faker->randomFloat(2, 50, 200),
            'remaining_quantity' => $this->faker->randomFloat(2, 50, 200),
            'minimum_quantity' => $this->faker->randomFloat(2, 10, 30),
            'unit_price' => $this->faker->randomFloat(2, 1, 100),
            'lot_number' => 'LOT' . $this->faker->unique()->numberBetween(1000, 9999),
            'expiration_date' => $this->faker->dateTimeBetween('now', '+2 years'),
            'status' => $this->faker->randomElement(['available', 'in_use', 'depleted', 'expired']),
        ];
    }
} 