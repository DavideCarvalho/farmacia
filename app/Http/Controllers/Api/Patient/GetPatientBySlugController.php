<?php

namespace App\Http\Controllers\Api\Patient;

use App\Data\PatientData;
use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\JsonResponse;

class GetPatientBySlugController extends Controller
{
    public function __invoke(string $slug): JsonResponse
    {
        $patient = Patient::with([
            'hospitalStays' => function ($query) {
                $query->orderBy('entry_at', 'desc');
            },
            'hospitalStays.observations' => function ($query) {
                $query->with(['user', 'biologicalMetrics'])
                    ->orderBy('created_at', 'desc');
            }
        ])->where('slug', $slug)->firstOrFail();

        return response()->json(PatientData::make($patient));
    }
} 