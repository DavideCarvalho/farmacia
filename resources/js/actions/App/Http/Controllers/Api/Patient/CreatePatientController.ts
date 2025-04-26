import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientController::CreatePatientController
 * @see app/Http/Controllers/Api/Patient/CreatePatientController.php:11
 * @route /api/patients
 */
const CreatePatientController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreatePatientController.url(options),
    method: 'post',
})

CreatePatientController.definition = {
    methods: ['post'],
    url: '\/api\/patients',
}

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientController::CreatePatientController
 * @see app/Http/Controllers/Api/Patient/CreatePatientController.php:11
 * @route /api/patients
 */
CreatePatientController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return CreatePatientController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientController::CreatePatientController
 * @see app/Http/Controllers/Api/Patient/CreatePatientController.php:11
 * @route /api/patients
 */
CreatePatientController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreatePatientController.url(options),
    method: 'post',
})

export default CreatePatientController