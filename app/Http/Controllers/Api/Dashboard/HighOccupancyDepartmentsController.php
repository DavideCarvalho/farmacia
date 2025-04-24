<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Data\Dashboard\HighOccupancyDepartmentData;
use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\JsonResponse;

class HighOccupancyDepartmentsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $departments = Department::with(['rooms' => function ($query) {
            $query->with(['patients' => function ($query) {
                $query->whereNull('patient_room.check_out_at');
            }]);
        }])
            ->get();

        $departments = $departments
            ->map(fn (Department $department) => HighOccupancyDepartmentData::make($department))
            ->filter(fn (HighOccupancyDepartmentData $department) => $department->occupancyPercentage >= 50)
            ->sortByDesc('occupancyPercentage')
            ->values();

        return response()->json($departments);
    }
}
