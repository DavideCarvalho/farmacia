<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\PatientHospitalStay;
use App\Models\PatientObservation;
use App\Models\User;
use Illuminate\Database\Seeder;

class PatientObservationSeeder extends Seeder
{
    public function run(): void
    {
        $patients = Patient::all();
        $users = User::all();

        if ($patients->isEmpty() || $users->isEmpty()) {
            return;
        }

        $observationTypes = ['medical', 'nursing', 'pharmaceutical'];
        $observations = [
            'medical' => [
                'Paciente apresentou melhora significativa no quadro geral.',
                'Paciente com sinais de recuperação satisfatória.',
                'Necessário ajuste na medicação.',
                'Paciente estável, mantendo evolução positiva.',
                'Realizar exames complementares para avaliação.',
            ],
            'nursing' => [
                'Paciente alimentou-se bem durante o dia.',
                'Realizada higiene e troca de curativos.',
                'Paciente apresentou sono tranquilo durante a noite.',
                'Administrada medicação conforme prescrição.',
                'Paciente com bom humor e colaborativo.',
            ],
            'pharmaceutical' => [
                'Medicamentos administrados conforme horário prescrito.',
                'Realizada verificação de estoque de medicamentos.',
                'Paciente não apresentou reações adversas aos medicamentos.',
                'Necessário reposição de medicamentos.',
                'Ajuste realizado na dosagem conforme orientação médica.',
            ],
        ];

        foreach ($patients as $patient) {
            $stays = $patient->hospitalStays;
            
            if ($stays->isEmpty()) {
                continue;
            }

            foreach ($stays as $stay) {
                // Create 3-5 observations per stay
                $numObservations = rand(3, 5);
                
                for ($i = 0; $i < $numObservations; $i++) {
                    $type = $observationTypes[array_rand($observationTypes)];
                    $observation = $observations[$type][array_rand($observations[$type])];
                    
                    $observation = PatientObservation::create([
                        'patient_hospital_stay_id' => $stay->id,
                        'user_id' => $users->random()->id,
                        'observation' => $observation,
                        'observation_type' => $type,
                        'created_at' => now()->subHours(rand(1, 24)),
                    ]);

                    // Create biological metrics for some observations
                    if (rand(0, 1)) {
                        $this->createBiologicalMetrics($observation);
                    }
                }
            }
        }
    }

    private function createBiologicalMetrics(PatientObservation $observation): void
    {
        $metrics = [
            [
                'type' => 'blood_pressure',
                'value' => rand(90, 140), // Store systolic pressure as numeric
                'unit' => 'mmHg',
            ],
            [
                'type' => 'heart_rate',
                'value' => rand(60, 100),
                'unit' => 'bpm',
            ],
            [
                'type' => 'temperature',
                'value' => rand(360, 380) / 10,
                'unit' => '°C',
            ],
            [
                'type' => 'oxygen_saturation',
                'value' => rand(95, 100),
                'unit' => '%',
            ],
            [
                'type' => 'blood_glucose',
                'value' => rand(70, 140),
                'unit' => 'mg/dL',
            ],
        ];

        // Create 2-4 random metrics
        $numMetrics = rand(2, 4);
        $selectedMetrics = array_rand($metrics, $numMetrics);

        if (!is_array($selectedMetrics)) {
            $selectedMetrics = [$selectedMetrics];
        }

        foreach ($selectedMetrics as $index) {
            $metric = $metrics[$index];
            
            // For blood pressure, create two separate metrics for systolic and diastolic
            if ($metric['type'] === 'blood_pressure') {
                $systolic = $metric['value'];
                $diastolic = rand(60, 90);
                
                // Create systolic pressure metric
                $observation->biologicalMetrics()->create([
                    'metric_type' => 'blood_pressure_systolic',
                    'value' => $systolic,
                    'unit' => $metric['unit'],
                    'notes' => rand(0, 1) ? 'Pressão sistólica' : null,
                ]);
                
                // Create diastolic pressure metric
                $observation->biologicalMetrics()->create([
                    'metric_type' => 'blood_pressure_diastolic',
                    'value' => $diastolic,
                    'unit' => $metric['unit'],
                    'notes' => rand(0, 1) ? 'Pressão diastólica' : null,
                ]);
            } else {
                $observation->biologicalMetrics()->create([
                    'metric_type' => $metric['type'],
                    'value' => $metric['value'],
                    'unit' => $metric['unit'],
                    'notes' => rand(0, 1) ? 'Observação adicional sobre a medição.' : null,
                ]);
            }
        }
    }
} 