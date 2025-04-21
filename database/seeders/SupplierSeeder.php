<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = [
            [
                'name' => 'Drogaria São Paulo',
                'email' => 'contato@drogariasaopaulo.com.br',
                'phone' => '(11) 1234-5678',
                'address' => 'Rua das Flores, 123',
                'city' => 'São Paulo',
                'state' => 'SP',
                'zip_code' => '01234-567',
                'description' => 'Fornecedor de medicamentos e produtos farmacêuticos',
                'is_active' => true,
            ],
            [
                'name' => 'Farmácia Popular',
                'email' => 'contato@farmaciapopular.com.br',
                'phone' => '(11) 8765-4321',
                'address' => 'Avenida Principal, 456',
                'city' => 'São Paulo',
                'state' => 'SP',
                'zip_code' => '04567-890',
                'description' => 'Distribuidora de medicamentos genéricos',
                'is_active' => true,
            ],
            [
                'name' => 'Distribuidora de Medicamentos',
                'email' => 'contato@distribuidora.com.br',
                'phone' => '(11) 1111-2222',
                'address' => 'Rua Comercial, 789',
                'city' => 'São Paulo',
                'state' => 'SP',
                'zip_code' => '07890-123',
                'description' => 'Atacadista de produtos farmacêuticos',
                'is_active' => true,
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
