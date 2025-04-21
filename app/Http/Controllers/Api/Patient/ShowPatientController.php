<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use App\Models\Patient;

class ShowPatientController extends Controller
{
    public function __invoke(Patient $patient)
    {
        return response()->json($patient);
    }
} 