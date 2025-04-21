<?php

namespace Database\Seeders;

use App\Enums\UnitOfMeasurement;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Paracetamol 500mg',
                'barcode' => '7891234567890',
                'description' => 'Analgésico e antitérmico',
                'purchase_price' => 5.00,
                'selling_price' => 10.00,
                'unit_of_measurement' => UnitOfMeasurement::CP,
                'quantity_per_unit' => 500,
                'quantity_in_stock' => 100,
                'minimum_quantity' => 20,
                'expiration_date' => '2025-12-31',
                'batch_number' => 'LOT001',
                'category_id' => 1,
                'supplier_id' => 1,
            ],
            [
                'name' => 'Dipirona 500mg',
                'barcode' => '7891234567891',
                'description' => 'Analgésico e antitérmico',
                'purchase_price' => 4.00,
                'selling_price' => 8.00,
                'unit_of_measurement' => UnitOfMeasurement::CP,
                'quantity_per_unit' => 500,
                'quantity_in_stock' => 100,
                'minimum_quantity' => 20,
                'expiration_date' => '2025-12-31',
                'batch_number' => 'LOT002',
                'category_id' => 1,
                'supplier_id' => 1,
            ],
            [
                'name' => 'Álcool 70% 1L',
                'barcode' => '7891234567892',
                'description' => 'Antisséptico',
                'purchase_price' => 15.00,
                'selling_price' => 30.00,
                'unit_of_measurement' => UnitOfMeasurement::L,
                'quantity_per_unit' => 1,
                'quantity_in_stock' => 50,
                'minimum_quantity' => 10,
                'expiration_date' => '2025-12-31',
                'batch_number' => 'LOT003',
                'category_id' => 2,
                'supplier_id' => 2,
            ],
            [
                'name' => 'Soro Fisiológico 500ml',
                'barcode' => '7891234567893',
                'description' => 'Solução isotônica',
                'purchase_price' => 5.00,
                'selling_price' => 10.00,
                'unit_of_measurement' => UnitOfMeasurement::ML,
                'quantity_per_unit' => 500,
                'quantity_in_stock' => 50,
                'minimum_quantity' => 10,
                'expiration_date' => '2025-12-31',
                'batch_number' => 'LOT004',
                'category_id' => 1,
                'supplier_id' => 1,
            ],
            [
                'name' => 'Papel A4',
                'barcode' => '7891234567894',
                'description' => 'Papel para impressão',
                'purchase_price' => 20.00,
                'selling_price' => 40.00,
                'quantity_in_stock' => 200,
                'minimum_quantity' => 50,
                'expiration_date' => null,
                'batch_number' => null,
                'category_id' => 3,
                'supplier_id' => 3,
            ],
            [
                'name' => 'Estetoscópio',
                'barcode' => '7891234567895',
                'description' => 'Instrumento médico',
                'purchase_price' => 50.00,
                'selling_price' => 100.00,
                'quantity_in_stock' => 10,
                'minimum_quantity' => 2,
                'expiration_date' => null,
                'batch_number' => null,
                'category_id' => 4,
                'supplier_id' => 3,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
