<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = Patient::all();
        $rooms = Room::all();

        // Apenas 30% dos pacientes estarão internados
        $patientsToAssign = $patients->random(ceil($patients->count() * 0.3));

        // Garantir que alguns quartos tenham alta ocupação
        $highOccupancyRooms = $rooms->random(ceil($rooms->count() * 0.3));
        $remainingRooms = $rooms->diff($highOccupancyRooms);

        // Atribuir pacientes aos quartos de alta ocupação
        foreach ($highOccupancyRooms as $room) {
            $capacity = $room->capacity;
            $targetOccupancy = ceil($capacity * 0.7); // 70% de ocupação
            $currentOccupancy = $room->getCurrentOccupancy();

            if ($currentOccupancy < $targetOccupancy) {
                $patientsNeeded = $targetOccupancy - $currentOccupancy;
                $availablePatients = $patientsToAssign->whereNotIn('id', $room->patients->pluck('id'));

                if ($availablePatients->count() > 0) {
                    $patientsToAssign = $patientsToAssign->diff($availablePatients->take($patientsNeeded));
                    $room->patients()->attach(
                        $availablePatients->take($patientsNeeded)->pluck('id'),
                        [
                            'check_in_at' => now()->subDays(rand(1, 30)),
                            'notes' => 'Paciente internado para tratamento',
                        ]
                    );
                }
            }
        }

        // Atribuir pacientes restantes aos outros quartos
        foreach ($remainingRooms as $room) {
            if ($room->isAvailable() && $patientsToAssign->count() > 0) {
                $patient = $patientsToAssign->pop();
                $room->patients()->attach($patient->id, [
                    'check_in_at' => now()->subDays(rand(1, 30)),
                    'notes' => 'Paciente internado para tratamento',
                ]);
            }
        }

        // Adicionar alguns pacientes que já deram alta
        foreach ($rooms as $room) {
            $patientsInRoom = $room->getCurrentOccupancy();
            if ($patientsInRoom > 0) {
                // 30% dos pacientes deram alta
                $patientsToCheckOut = $room->patients()
                    ->whereNull('patient_room.check_out_at')
                    ->take(ceil($patientsInRoom * 0.3))
                    ->get();

                foreach ($patientsToCheckOut as $patient) {
                    $room->patients()->updateExistingPivot($patient->id, [
                        'check_out_at' => now()->subDays(rand(1, 10)),
                    ]);
                }
            }
        }
    }
}
