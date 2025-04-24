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
        // Lista de departamentos que têm quartos
        $departmentsWithRooms = [
            'ENF', // Enfermaria
            'PED', // Pediatria
            'MAT', // Maternidade
            'UTI', // UTI
            'ONC', // Oncologia
            'CAR', // Cardiologia
            'NEU', // Neurologia
            'ORT', // Ortopedia
        ];

        $departments = Department::whereIn('code', $departmentsWithRooms)->get();

        foreach ($departments as $department) {
            // Criar quartos para cada departamento
            $rooms = [
                [
                    'name' => 'Quarto Individual',
                    'number' => $department->code . '-101',
                    'capacity' => 1,
                    'description' => 'Quarto individual com banheiro privativo',
                ],
                [
                    'name' => 'Quarto Duplo',
                    'number' => $department->code . '-102',
                    'capacity' => 2,
                    'description' => 'Quarto duplo com banheiro compartilhado',
                ],
                [
                    'name' => 'Quarto Coletivo',
                    'number' => $department->code . '-103',
                    'capacity' => 4,
                    'description' => 'Quarto coletivo com banheiro compartilhado',
                ],
            ];

            foreach ($rooms as $room) {
                Room::create([
                    ...$room,
                    'department_id' => $department->id,
                ]);
            }
        }
    }
}
