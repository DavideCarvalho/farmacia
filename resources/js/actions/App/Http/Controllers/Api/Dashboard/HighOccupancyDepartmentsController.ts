import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController::HighOccupancyDepartmentsController
 * @see app/Http/Controllers/Api/Dashboard/HighOccupancyDepartmentsController.php:12
 * @route /api/dashboard/high-occupancy-departments
 */
const HighOccupancyDepartmentsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: HighOccupancyDepartmentsController.url(options),
    method: 'get',
})

HighOccupancyDepartmentsController.definition = {
    methods: ['get','head'],
    url: '\/api\/dashboard\/high-occupancy-departments',
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController::HighOccupancyDepartmentsController
 * @see app/Http/Controllers/Api/Dashboard/HighOccupancyDepartmentsController.php:12
 * @route /api/dashboard/high-occupancy-departments
 */
HighOccupancyDepartmentsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return HighOccupancyDepartmentsController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController::HighOccupancyDepartmentsController
 * @see app/Http/Controllers/Api/Dashboard/HighOccupancyDepartmentsController.php:12
 * @route /api/dashboard/high-occupancy-departments
 */
HighOccupancyDepartmentsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: HighOccupancyDepartmentsController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController::HighOccupancyDepartmentsController
 * @see app/Http/Controllers/Api/Dashboard/HighOccupancyDepartmentsController.php:12
 * @route /api/dashboard/high-occupancy-departments
 */
HighOccupancyDepartmentsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: HighOccupancyDepartmentsController.url(options),
    method: 'head',
})

export default HighOccupancyDepartmentsController