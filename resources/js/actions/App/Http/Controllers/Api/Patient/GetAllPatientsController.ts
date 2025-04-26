import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\GetAllPatientsController::GetAllPatientsController
 * @see app/Http/Controllers/Api/Patient/GetAllPatientsController.php:11
 * @route /api/patients/all
 */
const GetAllPatientsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetAllPatientsController.url(options),
    method: 'get',
})

GetAllPatientsController.definition = {
    methods: ['get','head'],
    url: '\/api\/patients\/all',
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetAllPatientsController::GetAllPatientsController
 * @see app/Http/Controllers/Api/Patient/GetAllPatientsController.php:11
 * @route /api/patients/all
 */
GetAllPatientsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetAllPatientsController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetAllPatientsController::GetAllPatientsController
 * @see app/Http/Controllers/Api/Patient/GetAllPatientsController.php:11
 * @route /api/patients/all
 */
GetAllPatientsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetAllPatientsController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\GetAllPatientsController::GetAllPatientsController
 * @see app/Http/Controllers/Api/Patient/GetAllPatientsController.php:11
 * @route /api/patients/all
 */
GetAllPatientsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetAllPatientsController.url(options),
    method: 'head',
})

export default GetAllPatientsController