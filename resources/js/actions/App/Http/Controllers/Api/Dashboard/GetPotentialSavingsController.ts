import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController::GetPotentialSavingsController
 * @see app/Http/Controllers/Api/Dashboard/GetPotentialSavingsController.php:15
 * @route /api/dashboard/potential-savings
 */
const GetPotentialSavingsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPotentialSavingsController.url(options),
    method: 'get',
})

GetPotentialSavingsController.definition = {
    methods: ['get','head'],
    url: '\/api\/dashboard\/potential-savings',
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController::GetPotentialSavingsController
 * @see app/Http/Controllers/Api/Dashboard/GetPotentialSavingsController.php:15
 * @route /api/dashboard/potential-savings
 */
GetPotentialSavingsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetPotentialSavingsController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController::GetPotentialSavingsController
 * @see app/Http/Controllers/Api/Dashboard/GetPotentialSavingsController.php:15
 * @route /api/dashboard/potential-savings
 */
GetPotentialSavingsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPotentialSavingsController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController::GetPotentialSavingsController
 * @see app/Http/Controllers/Api/Dashboard/GetPotentialSavingsController.php:15
 * @route /api/dashboard/potential-savings
 */
GetPotentialSavingsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetPotentialSavingsController.url(options),
    method: 'head',
})

export default GetPotentialSavingsController