import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientPaginatedController::GetPatientPaginatedController
 * @see app/Http/Controllers/Api/Patient/GetPatientPaginatedController.php:15
 * @route /api/patients
 */
const GetPatientPaginatedController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPatientPaginatedController.url(options),
    method: 'get',
})

GetPatientPaginatedController.definition = {
    methods: ['get','head'],
    url: '\/api\/patients',
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientPaginatedController::GetPatientPaginatedController
 * @see app/Http/Controllers/Api/Patient/GetPatientPaginatedController.php:15
 * @route /api/patients
 */
GetPatientPaginatedController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetPatientPaginatedController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientPaginatedController::GetPatientPaginatedController
 * @see app/Http/Controllers/Api/Patient/GetPatientPaginatedController.php:15
 * @route /api/patients
 */
GetPatientPaginatedController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPatientPaginatedController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientPaginatedController::GetPatientPaginatedController
 * @see app/Http/Controllers/Api/Patient/GetPatientPaginatedController.php:15
 * @route /api/patients
 */
GetPatientPaginatedController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetPatientPaginatedController.url(options),
    method: 'head',
})

export default GetPatientPaginatedController