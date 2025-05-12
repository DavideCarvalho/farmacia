<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\DepartmentItem;
use App\Models\InventoryItem;
use App\Models\PatientApplication;
use App\Models\Product;
use App\Models\User;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DepartmentItemSeeder extends Seeder
{
    public function run(): void
    {
        // Obter o departamento de farmácia
        $pharmacyDepartment = Department::where('code', 'FAR')->first();

        if (!$pharmacyDepartment) {
            $pharmacyDepartment = Department::create([
                'name' => 'Farmácia',
                'code' => 'FAR',
                'description' => 'Departamento de farmácia',
            ]);
        }

        // Obter um usuário para as aplicações
        $user = User::first();

        // Obter um paciente para as aplicações
        $patient = Patient::first();
        if (!$patient) {
            $patient = Patient::create([
                'name' => 'Paciente Teste',
                'cpf' => '12345678900',
                'birth_date' => '1990-01-01',
                'gender' => 'M',
                'phone' => '11999999999',
                'email' => 'paciente@teste.com',
                'address' => 'Rua Teste, 123',
                'city' => 'São Paulo',
                'state' => 'SP',
                'zip_code' => '01234-567',
            ]);
        }

        // Obter os produtos
        $paracetamol = Product::where('name', 'Paracetamol 500mg')->first();
        $dipirona = Product::where('name', 'Dipirona 500mg')->first();
        $soro = Product::where('name', 'Soro Fisiológico 500ml')->first();
        $alcool = Product::where('name', 'Álcool 70% 1L')->first();

        // Criar itens de inventário para cada produto
        $inventoryItems = [
            [
                'product_id' => $paracetamol->id,
                'department_id' => $pharmacyDepartment->id,
                'quantity' => 100,
                'remaining_quantity' => 100,
                'unit_price' => 2.50,
                'lot_number' => 'LOT001',
                'expiration_date' => now()->addMonths(12),
                'status' => 'available',
            ],
            [
                'product_id' => $dipirona->id,
                'department_id' => $pharmacyDepartment->id,
                'quantity' => 50,
                'remaining_quantity' => 50,
                'unit_price' => 3.00,
                'lot_number' => 'LOT002',
                'expiration_date' => now()->addMonths(18),
                'status' => 'available',
            ],
            [
                'product_id' => $soro->id,
                'department_id' => $pharmacyDepartment->id,
                'quantity' => 30,
                'remaining_quantity' => 30,
                'unit_price' => 5.00,
                'lot_number' => 'LOT003',
                'expiration_date' => now()->addMonths(6),
                'status' => 'available',
            ],
            [
                'product_id' => $alcool->id,
                'department_id' => $pharmacyDepartment->id,
                'quantity' => 20,
                'remaining_quantity' => 20,
                'unit_price' => 15.00,
                'lot_number' => 'LOT004',
                'expiration_date' => now()->addMonths(24),
                'status' => 'available',
            ],
        ];

        foreach ($inventoryItems as $itemData) {
            $inventoryItem = InventoryItem::create($itemData);
            $product = $inventoryItem->product;

            // Criar DepartmentItems para cada InventoryItem
            // Paracetamol - 10 unidades
            for ($i = 0; $i < 10; $i++) {
                if ($i < 3) { // 3 unidades completamente usadas
                    $departmentItem = DepartmentItem::create([
                        'department_id' => $pharmacyDepartment->id,
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'used',
                        'used_at' => now()->subDays(rand(1, 30)),
                    ]);

                    $usedQuantity = $product->quantity_per_unit;
                    PatientApplication::create([
                        'patient_id' => $patient->id,
                        'product_id' => $product->id,
                        'department_item_id' => $departmentItem->id,
                        'user_id' => $user->id,
                        'quantity' => $usedQuantity,
                        'application_date' => now()->subDays(rand(1, 30)),
                    ]);
                } else { // 7 unidades disponíveis
                    DepartmentItem::create([
                        'department_id' => $pharmacyDepartment->id,
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'available',
                    ]);
                }
            }

            // Dipirona - 10 unidades
            for ($i = 0; $i < 10; $i++) {
                if ($i < 5) { // 5 unidades parcialmente usadas
                    $departmentItem = DepartmentItem::create([
                        'department_id' => $pharmacyDepartment->id,
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'available',
                    ]);

                    $usedQuantity = $product->quantity_per_unit * 0.5;
                    PatientApplication::create([
                        'patient_id' => $patient->id,
                        'product_id' => $product->id,
                        'department_item_id' => $departmentItem->id,
                        'user_id' => $user->id,
                        'quantity' => $usedQuantity,
                        'application_date' => now()->subDays(rand(1, 30)),
                    ]);
                } else { // 5 unidades disponíveis
                    DepartmentItem::create([
                        'department_id' => $pharmacyDepartment->id,
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'available',
                    ]);
                }
            }

            // Soro Fisiológico - 30 unidades
            for ($i = 0; $i < 30; $i++) {
                if ($i < 10) { // 10 unidades parcialmente usadas
                    $departmentItem = DepartmentItem::create([
                        'department_id' => $pharmacyDepartment->id,
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'available',
                    ]);

                    $usedQuantity = $product->quantity_per_unit * 0.7;
                    PatientApplication::create([
                        'patient_id' => $patient->id,
                        'product_id' => $product->id,
                        'department_item_id' => $departmentItem->id,
                        'user_id' => $user->id,
                        'quantity' => $usedQuantity,
                        'application_date' => now()->subDays(rand(1, 30)),
                    ]);
                } else { // 20 unidades disponíveis
                    DepartmentItem::create([
                        'department_id' => $pharmacyDepartment->id,
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'available',
                    ]);
                }
            }

            // Álcool - 20 unidades
            for ($i = 0; $i < 20; $i++) {
                if ($i < 5) { // 5 unidades parcialmente usadas
                    $departmentItem = DepartmentItem::create([
                        'department_id' => $pharmacyDepartment->id,
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'available',
                    ]);

                    $usedQuantity = $product->quantity_per_unit * 0.3;
                    PatientApplication::create([
                        'patient_id' => $patient->id,
                        'product_id' => $product->id,
                        'department_item_id' => $departmentItem->id,
                        'user_id' => $user->id,
                        'quantity' => $usedQuantity,
                        'application_date' => now()->subDays(rand(1, 30)),
                    ]);
                } else { // 15 unidades disponíveis
                    DepartmentItem::create([
                        'department_id' => $pharmacyDepartment->id,
                        'inventory_item_id' => $inventoryItem->id,
                        'status' => 'available',
                    ]);
                }
            }
        }
    }
} 