import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController::get
 * @see app/Http/Controllers/Api/Patient/GetPatientHospitalStayPaginatedController.php:15
 * @route /api/patients/hospital-stays
 */
export const get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

get.definition = {
    methods: ['get','head'],
    url: '\/api\/patients\/hospital-stays',
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController::get
 * @see app/Http/Controllers/Api/Patient/GetPatientHospitalStayPaginatedController.php:15
 * @route /api/patients/hospital-stays
 */
get.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return get.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController::get
 * @see app/Http/Controllers/Api/Patient/GetPatientHospitalStayPaginatedController.php:15
 * @route /api/patients/hospital-stays
 */
get.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController::get
 * @see app/Http/Controllers/Api/Patient/GetPatientHospitalStayPaginatedController.php:15
 * @route /api/patients/hospital-stays
 */
get.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: get.url(options),
    method: 'head',
})

export default get