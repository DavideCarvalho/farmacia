import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController::GetPatientApplicationPaginatedController
 * @see app/Http/Controllers/Api/PatientApplication/GetPatientApplicationPaginatedController.php:15
 * @route /api/patient-applications
 */
const GetPatientApplicationPaginatedController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPatientApplicationPaginatedController.url(options),
    method: 'get',
})

GetPatientApplicationPaginatedController.definition = {
    methods: ['get','head'],
    url: '\/api\/patient-applications',
}

/**
 * @see \App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController::GetPatientApplicationPaginatedController
 * @see app/Http/Controllers/Api/PatientApplication/GetPatientApplicationPaginatedController.php:15
 * @route /api/patient-applications
 */
GetPatientApplicationPaginatedController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetPatientApplicationPaginatedController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController::GetPatientApplicationPaginatedController
 * @see app/Http/Controllers/Api/PatientApplication/GetPatientApplicationPaginatedController.php:15
 * @route /api/patient-applications
 */
GetPatientApplicationPaginatedController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPatientApplicationPaginatedController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController::GetPatientApplicationPaginatedController
 * @see app/Http/Controllers/Api/PatientApplication/GetPatientApplicationPaginatedController.php:15
 * @route /api/patient-applications
 */
GetPatientApplicationPaginatedController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetPatientApplicationPaginatedController.url(options),
    method: 'head',
})

export default GetPatientApplicationPaginatedController