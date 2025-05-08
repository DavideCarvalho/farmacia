<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use App\Models\PatientHospitalStay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreatePatientHospitalStayController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'exists:patients,id'],
            'entry_at' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $stay = DB::transaction(function () use ($validated) {
            return PatientHospitalStay::create($validated);
        });

        return response()->json($stay, 201);
    }
}
