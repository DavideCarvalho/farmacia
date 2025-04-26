import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController::potentialSavings
 * @see app/Http/Controllers/Api/Dashboard/GetPotentialSavingsController.php:15
 * @route /api/dashboard/potential-savings
 */
export const potentialSavings = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: potentialSavings.url(options),
    method: 'get',
})

potentialSavings.definition = {
    methods: ['get','head'],
    url: '\/api\/dashboard\/potential-savings',
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController::potentialSavings
 * @see app/Http/Controllers/Api/Dashboard/GetPotentialSavingsController.php:15
 * @route /api/dashboard/potential-savings
 */
potentialSavings.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return potentialSavings.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController::potentialSavings
 * @see app/Http/Controllers/Api/Dashboard/GetPotentialSavingsController.php:15
 * @route /api/dashboard/potential-savings
 */
potentialSavings.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: potentialSavings.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController::potentialSavings
 * @see app/Http/Controllers/Api/Dashboard/GetPotentialSavingsController.php:15
 * @route /api/dashboard/potential-savings
 */
potentialSavings.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: potentialSavings.url(options),
    method: 'head',
})

export default potentialSavings