<?php

namespace App\Http\Controllers\Api\Department;

use App\Data\DepartmentData;
use App\Http\Controllers\Controller;
use App\Models\Department;

class GetAllDepartmentsController extends Controller
{

    public function __invoke()
    {
        $departments = Department::orderBy('name')
            ->get()
            ->map(fn(Department $department) => DepartmentData::make($department));

        return response()->json($departments);
    }
}
