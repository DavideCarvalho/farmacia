import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\PatientApplication\CreatePatientApplicationController::CreatePatientApplicationController
 * @see app/Http/Controllers/Api/PatientApplication/CreatePatientApplicationController.php:12
 * @route /api/patient-applications
 */
const CreatePatientApplicationController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreatePatientApplicationController.url(options),
    method: 'post',
})

CreatePatientApplicationController.definition = {
    methods: ['post'],
    url: '\/api\/patient-applications',
}

/**
 * @see \App\Http\Controllers\Api\PatientApplication\CreatePatientApplicationController::CreatePatientApplicationController
 * @see app/Http/Controllers/Api/PatientApplication/CreatePatientApplicationController.php:12
 * @route /api/patient-applications
 */
CreatePatientApplicationController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return CreatePatientApplicationController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\PatientApplication\CreatePatientApplicationController::CreatePatientApplicationController
 * @see app/Http/Controllers/Api/PatientApplication/CreatePatientApplicationController.php:12
 * @route /api/patient-applications
 */
CreatePatientApplicationController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreatePatientApplicationController.url(options),
    method: 'post',
})

export default CreatePatientApplicationController