<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProductCategorySeeder::class,
            SupplierSeeder::class,
            ProductSeeder::class,
            DepartmentSeeder::class,
            PatientSeeder::class,
            UserSeeder::class,
            InventoryMovementSeeder::class,
            PatientApplicationSeeder::class,
            InventoryItemSeeder::class,
            DepartmentItemSeeder::class,
            RoomSeeder::class,
            PatientRoomSeeder::class,
        ]);
    }
}
