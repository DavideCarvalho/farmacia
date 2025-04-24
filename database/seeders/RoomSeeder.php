<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $department = Department::where('code', 'ENF')->first();

        if (!$department) {
            return;
        }

        // Criar quartos para a enfermaria
        $totalRooms = 10; // Total de quartos a serem criados
        $roomTypes = [
            ['capacity' => 1, 'description' => 'Quarto individual com banheiro privativo'],
            ['capacity' => 2, 'description' => 'Quarto duplo com banheiro compartilhado'],
            ['capacity' => 4, 'description' => 'Quarto coletivo com banheiro compartilhado'],
        ];

        for ($i = 1; $i <= $totalRooms; $i++) {
            $roomType = $roomTypes[array_rand($roomTypes)];
            Room::create([
                'name' => "Quarto {$i}",
                'number' => "ENF-" . str_pad($i, 3, '0', STR_PAD_LEFT),
                'capacity' => $roomType['capacity'],
                'description' => $roomType['description'],
                'department_id' => $department->id,
            ]);
        }
    }
}
