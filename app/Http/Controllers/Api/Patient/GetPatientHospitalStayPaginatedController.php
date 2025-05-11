<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use App\Data\PatientHospitalStayData;
use App\Models\PatientHospitalStay;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use App\Models\Patient;
use Illuminate\Http\JsonResponse;

class GetPatientHospitalStayPaginatedController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $query = PatientHospitalStay::query();

        if ($request->has('patient_slug')) {
            $patient = Patient::where('slug', $request->patient_slug)->firstOrFail();
            $query->where('patient_id', $patient->id);
        }

        $hospitalStays = $query->orderBy('entry_at', 'desc')
            ->paginate(10);

        return response()->json($hospitalStays);
    }
}
