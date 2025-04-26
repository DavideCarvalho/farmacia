import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\GetAllPatientsController::getAll
 * @see app/Http/Controllers/Api/Patient/GetAllPatientsController.php:11
 * @route /api/patients/all
 */
export const getAll = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getAll.url(options),
    method: 'get',
})

getAll.definition = {
    methods: ['get','head'],
    url: '\/api\/patients\/all',
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetAllPatientsController::getAll
 * @see app/Http/Controllers/Api/Patient/GetAllPatientsController.php:11
 * @route /api/patients/all
 */
getAll.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return getAll.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetAllPatientsController::getAll
 * @see app/Http/Controllers/Api/Patient/GetAllPatientsController.php:11
 * @route /api/patients/all
 */
getAll.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getAll.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\GetAllPatientsController::getAll
 * @see app/Http/Controllers/Api/Patient/GetAllPatientsController.php:11
 * @route /api/patients/all
 */
getAll.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: getAll.url(options),
    method: 'head',
})

export default getAll