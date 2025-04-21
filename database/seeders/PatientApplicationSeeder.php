<?php

namespace Database\Seeders;

use App\Models\Patient;
use App\Models\PatientApplication;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class PatientApplicationSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        $patients = Patient::all();
        $products = Product::all();

        foreach ($patients as $patient) {
            PatientApplication::create([
                'patient_id' => $patient->id,
                'product_id' => $products->random()->id,
                'user_id' => $user->id,
                'application_date' => now(),
                'quantity' => 1,
                'notes' => 'Aplicação inicial',
            ]);
        }
    }
}
