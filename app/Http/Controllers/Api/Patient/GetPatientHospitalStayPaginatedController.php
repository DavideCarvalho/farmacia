<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use App\Data\PatientHospitalStayData;
use App\Models\PatientHospitalStay;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class GetPatientHospitalStayPaginatedController extends Controller
{
    public function __invoke(Request $request)
    {
        $stays = QueryBuilder::for(PatientHospitalStay::class)
            ->with('patient')
            ->allowedFilters([
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->whereHas('patient', function ($query) use ($value) {
                        $query->where('name', 'like', "%{$value}%")
                            ->orWhere('cpf', 'like', "%{$value}%");
                    });
                }),
                AllowedFilter::callback('status', function ($query, $value) {
                    if ($value === 'active') {
                        $query->whereNull('exit_at');
                    } elseif ($value === 'completed') {
                        $query->whereNotNull('exit_at');
                    }
                }),
            ])
            ->allowedSorts([
                AllowedSort::field('entry_at'),
                AllowedSort::field('exit_at'),
                AllowedSort::field('created_at'),
            ])
            ->defaultSort('-entry_at')
            ->paginate(10)
            ->appends($request->query());

        $staysData = PatientHospitalStayData::collect($stays);

        return response()->json($staysData);
    }
}
