<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\PatientHospitalStay;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatientHospitalStaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obter alguns pacientes existentes
        $patients = Patient::take(5)->get();

        if ($patients->isEmpty()) {
            $this->command->info('Nenhum paciente encontrado. Por favor, execute o PatientSeeder primeiro.');
            return;
        }

        foreach ($patients as $patient) {
            // Criar 1-3 internações para cada paciente
            $numberOfStays = rand(1, 3);

            for ($i = 0; $i < $numberOfStays; $i++) {
                $entryDate = now()->subDays(rand(0, 30));
                $exitDate = rand(0, 1) ? $entryDate->copy()->addDays(rand(1, 10)) : null;

                PatientHospitalStay::create([
                    'patient_id' => $patient->id,
                    'entry_at' => $entryDate,
                    'exit_at' => $exitDate,
                    'notes' => $this->generateRandomNotes($exitDate),
                ]);
            }
        }
    }

    private function generateRandomNotes(?string $exitDate): string
    {
        $notes = [
            'Internação de rotina para exames',
            'Tratamento de emergência',
            'Acompanhamento pós-operatório',
            'Internação para observação',
            'Tratamento de infecção',
        ];

        $note = $notes[array_rand($notes)];

        if ($exitDate) {
            $note .= ' - Alta médica concedida';
        } else {
            $note .= ' - Em tratamento';
        }

        return $note;
    }
}
