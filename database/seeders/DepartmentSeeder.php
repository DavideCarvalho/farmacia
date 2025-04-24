<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Administração',
                'code' => 'ADM',
                'description' => 'Departamento administrativo',
            ],
            [
                'name' => 'Farmácia',
                'code' => 'FAR',
                'description' => 'Departamento de farmácia',
            ],
            [
                'name' => 'Enfermaria',
                'code' => 'ENF',
                'description' => 'Departamento de enfermagem',
            ],
            [
                'name' => 'Laboratório',
                'code' => 'LAB',
                'description' => 'Departamento de laboratório',
            ],
            [
                'name' => 'Limpeza',
                'code' => 'LIM',
                'description' => 'Departamento de limpeza',
            ],
        ];

        foreach ($departments as $department) {
            Department::create($department);
        }
    }
}
