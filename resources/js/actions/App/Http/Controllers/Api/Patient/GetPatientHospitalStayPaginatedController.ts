import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController::GetPatientHospitalStayPaginatedController
 * @see app/Http/Controllers/Api/Patient/GetPatientHospitalStayPaginatedController.php:15
 * @route /api/patients/hospital-stays
 */
const GetPatientHospitalStayPaginatedController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPatientHospitalStayPaginatedController.url(options),
    method: 'get',
})

GetPatientHospitalStayPaginatedController.definition = {
    methods: ['get','head'],
    url: '\/api\/patients\/hospital-stays',
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController::GetPatientHospitalStayPaginatedController
 * @see app/Http/Controllers/Api/Patient/GetPatientHospitalStayPaginatedController.php:15
 * @route /api/patients/hospital-stays
 */
GetPatientHospitalStayPaginatedController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetPatientHospitalStayPaginatedController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController::GetPatientHospitalStayPaginatedController
 * @see app/Http/Controllers/Api/Patient/GetPatientHospitalStayPaginatedController.php:15
 * @route /api/patients/hospital-stays
 */
GetPatientHospitalStayPaginatedController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPatientHospitalStayPaginatedController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController::GetPatientHospitalStayPaginatedController
 * @see app/Http/Controllers/Api/Patient/GetPatientHospitalStayPaginatedController.php:15
 * @route /api/patients/hospital-stays
 */
GetPatientHospitalStayPaginatedController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetPatientHospitalStayPaginatedController.url(options),
    method: 'head',
})

export default GetPatientHospitalStayPaginatedController