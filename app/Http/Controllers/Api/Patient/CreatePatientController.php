<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class CreatePatientController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'cpf' => ['required', 'string', 'max:14', 'unique:patients,cpf'],
            'birth_date' => ['required', 'date'],
            'phone' => ['required', 'string', 'max:20'],
            'address' => ['required', 'string', 'max:255'],
            'medical_record' => ['required', 'string', 'max:255'],
        ]);

        $patient = Patient::create($validated);

        return response()->json($patient, 201);
    }
} 