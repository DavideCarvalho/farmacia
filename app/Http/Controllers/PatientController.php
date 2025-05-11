<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function getBySlug(string $slug)
    {
        $patient = Patient::where('slug', $slug)
            ->with('hospitalStays')
            ->firstOrFail();

        return response()->json($patient);
    }
} 