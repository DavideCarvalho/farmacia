import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController::highOccupancyDepartments
 * @see app/Http/Controllers/Api/Dashboard/HighOccupancyDepartmentsController.php:12
 * @route /api/dashboard/high-occupancy-departments
 */
export const highOccupancyDepartments = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: highOccupancyDepartments.url(options),
    method: 'get',
})

highOccupancyDepartments.definition = {
    methods: ['get','head'],
    url: '\/api\/dashboard\/high-occupancy-departments',
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController::highOccupancyDepartments
 * @see app/Http/Controllers/Api/Dashboard/HighOccupancyDepartmentsController.php:12
 * @route /api/dashboard/high-occupancy-departments
 */
highOccupancyDepartments.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return highOccupancyDepartments.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController::highOccupancyDepartments
 * @see app/Http/Controllers/Api/Dashboard/HighOccupancyDepartmentsController.php:12
 * @route /api/dashboard/high-occupancy-departments
 */
highOccupancyDepartments.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: highOccupancyDepartments.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController::highOccupancyDepartments
 * @see app/Http/Controllers/Api/Dashboard/HighOccupancyDepartmentsController.php:12
 * @route /api/dashboard/high-occupancy-departments
 */
highOccupancyDepartments.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: highOccupancyDepartments.url(options),
    method: 'head',
})

export default highOccupancyDepartments