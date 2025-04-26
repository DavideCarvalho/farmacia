import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientPaginatedController::get
 * @see app/Http/Controllers/Api/Patient/GetPatientPaginatedController.php:15
 * @route /api/patients
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
    url: '\/api\/patients',
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientPaginatedController::get
 * @see app/Http/Controllers/Api/Patient/GetPatientPaginatedController.php:15
 * @route /api/patients
 */
get.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return get.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientPaginatedController::get
 * @see app/Http/Controllers/Api/Patient/GetPatientPaginatedController.php:15
 * @route /api/patients
 */
get.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientPaginatedController::get
 * @see app/Http/Controllers/Api/Patient/GetPatientPaginatedController.php:15
 * @route /api/patients
 */
get.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: get.url(options),
    method: 'head',
})

export default get