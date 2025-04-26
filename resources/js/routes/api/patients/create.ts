import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientController::create
 * @see app/Http/Controllers/Api/Patient/CreatePatientController.php:11
 * @route /api/patients
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ['post'],
    url: '\/api\/patients',
}

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientController::create
 * @see app/Http/Controllers/Api/Patient/CreatePatientController.php:11
 * @route /api/patients
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientController::create
 * @see app/Http/Controllers/Api/Patient/CreatePatientController.php:11
 * @route /api/patients
 */
create.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: create.url(options),
    method: 'post',
})

export default create