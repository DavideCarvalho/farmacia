<?php

namespace App\Http\Controllers\Api\Patient;

use App\Data\PatientData;
use App\Http\Controllers\Controller;
use App\Models\Patient;

class GetAllPatientsController extends Controller
{
    public function __invoke()
    {
        $patients = Patient::orderBy('name')
            ->get()
            ->map(fn(Patient $patient) => PatientData::make($patient));

        return response()->json($patients);
    }
} 