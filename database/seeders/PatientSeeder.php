<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('pt_BR');

        for ($i = 1; $i <= 50; $i++) {
            Patient::create([
                'name' => $faker->name(),
                'cpf' => $faker->cpf(false),
                'birth_date' => $faker->dateTimeBetween('-80 years', '-18 years')->format('Y-m-d'),
                'phone' => $faker->phoneNumber(),
                'address' => $faker->streetAddress(),
                'medical_record' => 'MR' . str_pad($i, 3, '0', STR_PAD_LEFT),
            ]);
        }
    }
}
