<?php

namespace App\Http\Controllers\Api\Patient;

use App\Http\Controllers\Controller;
use App\Data\PatientData;
use App\Models\Patient;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class GetPatientPaginatedController extends Controller
{
    public function __invoke(Request $request)
    {
        $patients = QueryBuilder::for(Patient::class)
            ->allowedFilters([
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->where('name', 'ilike', "%{$value}%")
                            ->orWhere('cpf', 'ilike', "%{$value}%")
                            ->orWhere('phone', 'ilike', "%{$value}%");
                    });
                }),
            ])
            ->allowedSorts([
                AllowedSort::field('name'),
                AllowedSort::field('cpf'),
                AllowedSort::field('birth_date'),
                AllowedSort::field('created_at'),
            ])
            ->defaultSort('-created_at')
            ->paginate(10)
            ->appends($request->query());

        $patientsData = PatientData::collect($patients);

        return response()->json($patientsData);
    }
}
