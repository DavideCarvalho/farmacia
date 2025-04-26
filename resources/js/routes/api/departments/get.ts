import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Department\GetDepartmentPaginatedController::get
 * @see app/Http/Controllers/Api/Department/GetDepartmentPaginatedController.php:15
 * @route /api/departments
 */
export const get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

get.definition = {
    methods: ['get','head'],
    url: '\/api\/departments',
}

/**
 * @see \App\Http\Controllers\Api\Department\GetDepartmentPaginatedController::get
 * @see app/Http/Controllers/Api/Department/GetDepartmentPaginatedController.php:15
 * @route /api/departments
 */
get.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return get.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Department\GetDepartmentPaginatedController::get
 * @see app/Http/Controllers/Api/Department/GetDepartmentPaginatedController.php:15
 * @route /api/departments
 */
get.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Department\GetDepartmentPaginatedController::get
 * @see app/Http/Controllers/Api/Department/GetDepartmentPaginatedController.php:15
 * @route /api/departments
 */
get.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: get.url(options),
    method: 'head',
})

export default get