import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Department\GetAllDepartmentsController::GetAllDepartmentsController
 * @see app/Http/Controllers/Api/Department/GetAllDepartmentsController.php:12
 * @route /api/departments/all
 */
const GetAllDepartmentsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetAllDepartmentsController.url(options),
    method: 'get',
})

GetAllDepartmentsController.definition = {
    methods: ['get','head'],
    url: '\/api\/departments\/all',
}

/**
 * @see \App\Http\Controllers\Api\Department\GetAllDepartmentsController::GetAllDepartmentsController
 * @see app/Http/Controllers/Api/Department/GetAllDepartmentsController.php:12
 * @route /api/departments/all
 */
GetAllDepartmentsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetAllDepartmentsController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Department\GetAllDepartmentsController::GetAllDepartmentsController
 * @see app/Http/Controllers/Api/Department/GetAllDepartmentsController.php:12
 * @route /api/departments/all
 */
GetAllDepartmentsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetAllDepartmentsController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Department\GetAllDepartmentsController::GetAllDepartmentsController
 * @see app/Http/Controllers/Api/Department/GetAllDepartmentsController.php:12
 * @route /api/departments/all
 */
GetAllDepartmentsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetAllDepartmentsController.url(options),
    method: 'head',
})

export default GetAllDepartmentsController