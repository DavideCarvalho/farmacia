<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word,
            'description' => $this->faker->sentence,
            'product_category_id' => ProductCategory::factory(),
            'supplier_id' => Supplier::factory(),
            'type' => $this->faker->randomElement(['solid', 'liquid', 'gas']),
            'unit_of_measurement' => $this->faker->randomElement(['unit', 'ml', 'mg', 'g', 'l']),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
} 