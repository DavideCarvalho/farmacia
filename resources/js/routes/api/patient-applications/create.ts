import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\PatientApplication\CreatePatientApplicationController::create
 * @see app/Http/Controllers/Api/PatientApplication/CreatePatientApplicationController.php:12
 * @route /api/patient-applications
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
    url: '\/api\/patient-applications',
}

/**
 * @see \App\Http\Controllers\Api\PatientApplication\CreatePatientApplicationController::create
 * @see app/Http/Controllers/Api/PatientApplication/CreatePatientApplicationController.php:12
 * @route /api/patient-applications
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\PatientApplication\CreatePatientApplicationController::create
 * @see app/Http/Controllers/Api/PatientApplication/CreatePatientApplicationController.php:12
 * @route /api/patient-applications
 */
create.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: create.url(options),
    method: 'post',
})

export default create