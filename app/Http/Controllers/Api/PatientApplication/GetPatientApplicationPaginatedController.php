<?php

namespace App\Http\Controllers\Api\PatientApplication;

use App\Http\Controllers\Controller;
use App\Data\PatientApplicationData;
use App\Models\PatientApplication;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;

class GetPatientApplicationPaginatedController extends Controller
{
    public function __invoke(Request $request)
    {
        $applications = QueryBuilder::for(PatientApplication::class)
            ->join('patients', 'patients.id', '=', 'patient_applications.patient_id')
            ->join('products', 'products.id', '=', 'patient_applications.product_id')
            ->select('patient_applications.*')
            ->with(['patient', 'product'])
            ->allowedFilters([
                AllowedFilter::callback('search', function ($query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->whereHas('patient', function ($query) use ($value) {
                            $query->where('name', 'ilike', "%{$value}%");
                        })
                            ->orWhereHas('product', function ($query) use ($value) {
                                $query->where('name', 'ilike', "%{$value}%");
                            })
                            ->orWhere('notes', 'ilike', "%{$value}%");
                    });
                }),
            ])
            ->allowedSorts([
                AllowedSort::field('created_at'),
                AllowedSort::field('application_date'),
                AllowedSort::field('quantity'),
                AllowedSort::field('patient.name', 'patients.name'),
                AllowedSort::field('product.name', 'products.name'),
            ])
            ->defaultSort('-created_at')
            ->paginate(10)
            ->appends($request->query());

        $applicationsData = PatientApplicationData::collect($applications);

        return response()->json($applicationsData);
    }
} 