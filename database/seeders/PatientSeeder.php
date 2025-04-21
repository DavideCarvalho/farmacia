<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $patients = [
            [
                'name' => 'João da Silva',
                'cpf' => '12345678900',
                'birth_date' => '1990-01-01',
                'phone' => '(11) 99999-9999',
                'address' => 'Rua das Flores, 123',
                'medical_record' => 'MR001',
            ],
            [
                'name' => 'Maria Oliveira',
                'cpf' => '98765432100',
                'birth_date' => '1985-05-15',
                'phone' => '(11) 88888-8888',
                'address' => 'Avenida Principal, 456',
                'medical_record' => 'MR002',
            ],
            [
                'name' => 'Pedro Santos',
                'cpf' => '45678912300',
                'birth_date' => '1978-12-25',
                'phone' => '(11) 77777-7777',
                'address' => 'Rua dos Coqueiros, 789',
                'medical_record' => 'MR003',
            ],
        ];

        foreach ($patients as $patient) {
            Patient::create($patient);
        }
    }
}
