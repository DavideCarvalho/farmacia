<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Medicamentos',
            'Material de Limpeza',
            'Material de Escritório',
            'Equipamentos',
            'Outros',
        ];

        foreach ($categories as $category) {
            ProductCategory::create([
                'name' => $category,
            ]);
        }
    }
}
