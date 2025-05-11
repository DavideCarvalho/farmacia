<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\JsonResponse;

class GetPatientBySlugController extends Controller
{
    public function __invoke(string $slug): JsonResponse
    {
        $patient = Patient::where('slug', $slug)->firstOrFail();

        return response()->json($patient);
    }
} 