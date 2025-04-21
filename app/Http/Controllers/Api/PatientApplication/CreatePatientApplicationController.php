<?php

namespace App\Http\Controllers\Api\PatientApplication;

use App\Http\Controllers\Controller;
use App\Models\PatientApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreatePatientApplicationController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'exists:patients,id'],
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'application_date' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $application = DB::transaction(function () use ($validated) {
            return PatientApplication::create($validated);
        });

        return response()->json($application, 201);
    }
} 