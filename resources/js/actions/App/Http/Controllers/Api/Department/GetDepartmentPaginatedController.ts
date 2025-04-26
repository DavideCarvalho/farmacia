import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Department\GetDepartmentPaginatedController::GetDepartmentPaginatedController
 * @see app/Http/Controllers/Api/Department/GetDepartmentPaginatedController.php:15
 * @route /api/departments
 */
const GetDepartmentPaginatedController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetDepartmentPaginatedController.url(options),
    method: 'get',
})

GetDepartmentPaginatedController.definition = {
    methods: ['get','head'],
    url: '\/api\/departments',
}

/**
 * @see \App\Http\Controllers\Api\Department\GetDepartmentPaginatedController::GetDepartmentPaginatedController
 * @see app/Http/Controllers/Api/Department/GetDepartmentPaginatedController.php:15
 * @route /api/departments
 */
GetDepartmentPaginatedController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetDepartmentPaginatedController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Department\GetDepartmentPaginatedController::GetDepartmentPaginatedController
 * @see app/Http/Controllers/Api/Department/GetDepartmentPaginatedController.php:15
 * @route /api/departments
 */
GetDepartmentPaginatedController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetDepartmentPaginatedController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Department\GetDepartmentPaginatedController::GetDepartmentPaginatedController
 * @see app/Http/Controllers/Api/Department/GetDepartmentPaginatedController.php:15
 * @route /api/departments
 */
GetDepartmentPaginatedController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetDepartmentPaginatedController.url(options),
    method: 'head',
})

export default GetDepartmentPaginatedController