import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientHospitalStayController::CreatePatientHospitalStayController
 * @see app/Http/Controllers/Api/Patient/CreatePatientHospitalStayController.php:12
 * @route /api/hospital-stays
 */
const CreatePatientHospitalStayController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreatePatientHospitalStayController.url(options),
    method: 'post',
})

CreatePatientHospitalStayController.definition = {
    methods: ['post'],
    url: '\/api\/hospital-stays',
}

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientHospitalStayController::CreatePatientHospitalStayController
 * @see app/Http/Controllers/Api/Patient/CreatePatientHospitalStayController.php:12
 * @route /api/hospital-stays
 */
CreatePatientHospitalStayController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return CreatePatientHospitalStayController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\CreatePatientHospitalStayController::CreatePatientHospitalStayController
 * @see app/Http/Controllers/Api/Patient/CreatePatientHospitalStayController.php:12
 * @route /api/hospital-stays
 */
CreatePatientHospitalStayController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreatePatientHospitalStayController.url(options),
    method: 'post',
})

export default CreatePatientHospitalStayController