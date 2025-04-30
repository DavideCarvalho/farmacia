import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientHospitalStayController::create
 * @see app/Http/Controllers/Api/Patient/CreatePatientHospitalStayController.php:12
 * @route /api/hospital-stays
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
    url: '\/api\/hospital-stays',
}

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientHospitalStayController::create
 * @see app/Http/Controllers/Api/Patient/CreatePatientHospitalStayController.php:12
 * @route /api/hospital-stays
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientHospitalStayController::create
 * @see app/Http/Controllers/Api/Patient/CreatePatientHospitalStayController.php:12
 * @route /api/hospital-stays
 */
create.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: create.url(options),
    method: 'post',
})

export default create