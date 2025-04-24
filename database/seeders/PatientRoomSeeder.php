<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\Room;
use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PatientRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Primeiro departamento (Enfermaria) com ocupação acima de 50%
        $enfermaria = Department::where('code', 'ENF')->first();
        $this->seedDepartmentWithTargetOccupancy($enfermaria, 0.8); // 80% de ocupação

        // Opcionalmente, pode adicionar outros departamentos com ocupação de 50% ou menos
        // Por exemplo:
        // $outroDepartamento = Department::where('code', 'OUTRO')->first();
        // if ($outroDepartamento) {
        //     $this->seedDepartmentWithTargetOccupancy($outroDepartamento, 0.5);
        // }
    }

    /**
     * Popula um departamento com uma taxa de ocupação específica
     * 
     * @param Department $department
     * @param float $occupancyRate - Taxa de ocupação desejada (0.0 - 1.0)
     */
    private function seedDepartmentWithTargetOccupancy(Department $department, float $occupancyRate): void
    {
        $rooms = $department->rooms;

        // Calcular a ocupação alvo com base na taxa fornecida
        $totalCapacity = $rooms->sum('capacity');
        $targetOccupancy = ceil($totalCapacity * $occupancyRate);

        // Pegar pacientes que não estão alocados
        $availablePatients = Patient::whereDoesntHave('rooms')->get();

        // Garantir que teremos pacientes suficientes para a ocupação alvo
        // Criar 20% a mais para compensar possíveis altas
        $buffer = ceil($targetOccupancy * 0.2);
        if ($availablePatients->count() < ($targetOccupancy + $buffer)) {
            $neededPatients = ($targetOccupancy + $buffer) - $availablePatients->count();
            $newPatients = Patient::factory()->count($neededPatients)->create();
            $availablePatients = $availablePatients->concat($newPatients);
        }

        // Ordenar quartos por capacidade (maior para menor)
        $rooms = $rooms->sortByDesc('capacity');

        // Distribuir os pacientes pelos quartos do departamento
        foreach ($rooms as $room) {
            if ($availablePatients->isEmpty()) {
                break;
            }

            // Calcular quantos pacientes podemos alocar neste quarto
            $maxPatients = $room->capacity;
            $currentOccupancy = $room->getCurrentOccupancy();
            $availableBeds = $maxPatients - $currentOccupancy;

            if ($availableBeds > 0) {
                $patientsToAllocate = min($availableBeds, $availablePatients->count());
                $patientsForRoom = $availablePatients->random($patientsToAllocate);
                $availablePatients = $availablePatients->diff($patientsForRoom);

                foreach ($patientsForRoom as $patient) {
                    $room->patients()->attach($patient->id, [
                        'check_in_at' => now()->subDays(rand(1, 30)),
                        'notes' => 'Paciente internado para tratamento',
                    ]);
                }
            }
        }

        // Recarregar o departamento para garantir que temos dados atualizados
        $department->refresh();
        
        // Verificar se atingimos a meta de ocupação
        $currentOccupancy = $department->rooms->sum(function ($room) {
            return $room->patients()->whereNull('patient_room.check_out_at')->count();
        });

        if ($currentOccupancy < $targetOccupancy) {
            // Se não atingimos a meta, adicionar mais pacientes
            $additionalPatientsNeeded = $targetOccupancy - $currentOccupancy;
            $additionalPatients = Patient::factory()->count($additionalPatientsNeeded)->create();

            // Distribuir os pacientes adicionais
            foreach ($rooms as $room) {
                if ($additionalPatients->isEmpty()) {
                    break;
                }

                $maxPatients = $room->capacity;
                $currentOccupancy = $room->getCurrentOccupancy();
                $availableBeds = $maxPatients - $currentOccupancy;

                if ($availableBeds > 0) {
                    $patientsToAllocate = min($availableBeds, $additionalPatients->count());
                    $patientsForRoom = $additionalPatients->random($patientsToAllocate);
                    $additionalPatients = $additionalPatients->diff($patientsForRoom);

                    foreach ($patientsForRoom as $patient) {
                        $room->patients()->attach($patient->id, [
                            'check_in_at' => now()->subDays(rand(1, 30)),
                            'notes' => 'Paciente internado para tratamento',
                        ]);
                    }
                }
            }
        }

        // Reduzir a quantidade de pacientes que já deram alta para não afetar tanto a taxa de ocupação
        // Apenas 10% dos pacientes darão alta, em vez de 30%
        foreach ($rooms as $room) {
            $patientsInRoom = $room->getCurrentOccupancy();
            if ($patientsInRoom > 0) {
                $patientsToCheckOut = $room->patients()
                    ->whereNull('patient_room.check_out_at')
                    ->take(ceil($patientsInRoom * 0.1)) // Reduzido de 0.3 (30%) para 0.1 (10%)
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