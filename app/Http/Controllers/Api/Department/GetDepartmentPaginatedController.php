<?php

namespace App\Http\Controllers\Api\Department;

use App\Http\Controllers\Controller;
use App\Data\DepartmentData;
use App\Models\Department;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class GetDepartmentPaginatedController extends Controller
{
    public function __invoke(Request $request)
    {
        $departments = QueryBuilder::for(Department::class)
            ->select('departments.*')
            ->allowedFilters([
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->where('name', 'ilike', "%{$value}%")
                            ->orWhere('code', 'ilike', "%{$value}%")
                            ->orWhere('description', 'ilike', "%{$value}%");
                    });
                }),
            ])
            ->allowedSorts([
                AllowedSort::field('name'),
                AllowedSort::field('code'),
                AllowedSort::field('description'),
                AllowedSort::field('created_at'),
            ])
            ->defaultSort('name')
            ->paginate(10)
            ->appends($request->query());

        $departmentsData = DepartmentData::collect($departments);

        return response()->json($departmentsData);
    }
}
