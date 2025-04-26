import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController::get
 * @see app/Http/Controllers/Api/PatientApplication/GetPatientApplicationPaginatedController.php:15
 * @route /api/patient-applications
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
    url: '\/api\/patient-applications',
}

/**
 * @see \App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController::get
 * @see app/Http/Controllers/Api/PatientApplication/GetPatientApplicationPaginatedController.php:15
 * @route /api/patient-applications
 */
get.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return get.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController::get
 * @see app/Http/Controllers/Api/PatientApplication/GetPatientApplicationPaginatedController.php:15
 * @route /api/patient-applications
 */
get.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController::get
 * @see app/Http/Controllers/Api/PatientApplication/GetPatientApplicationPaginatedController.php:15
 * @route /api/patient-applications
 */
get.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: get.url(options),
    method: 'head',
})

export default get