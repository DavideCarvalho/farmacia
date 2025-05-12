<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\PatientObservation;
use App\Models\PatientBiologicalMetric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class PatientObservationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Patient $patient)
    {
        $validated = $request->validate([
            'observation' => 'required|string',
            'observation_type' => ['required', Rule::in(['medical', 'nursing', 'pharmaceutical'])],
            'metrics' => 'array',
            'metrics.*.metric_type' => ['required', Rule::in([
                'blood_pressure',
                'heart_rate',
                'temperature',
                'oxygen_saturation',
                'blood_glucose'
            ])],
            'metrics.*.value' => 'required|numeric',
            'metrics.*.unit' => ['required', Rule::in(['mmHg', 'bpm', '°C', '%', 'mg/dL'])],
            'metrics.*.notes' => 'nullable|string',
        ]);

        $currentStay = $patient->getCurrentStay();

        if (!$currentStay) {
            return response()->json([
                'message' => 'O paciente não está internado no momento.'
            ], 422);
        }

        $observation = PatientObservation::create([
            'patient_hospital_stay_id' => $currentStay->id,
            'user_id' => Auth::id(),
            'observation' => $validated['observation'],
            'observation_type' => $validated['observation_type'],
        ]);

        if (!empty($validated['metrics'])) {
            foreach ($validated['metrics'] as $metric) {
                PatientBiologicalMetric::create([
                    'patient_observation_id' => $observation->id,
                    'metric_type' => $metric['metric_type'],
                    'value' => $metric['value'],
                    'unit' => $metric['unit'],
                    'notes' => $metric['notes'] ?? null,
                ]);
            }
        }

        return response()->json([
            'message' => 'Observação registrada com sucesso.',
            'observation' => $observation->load(['biologicalMetrics', 'user']),
        ]);
    }
}
