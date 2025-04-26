import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController::GetLowStockAlertsController
 * @see app/Http/Controllers/Api/Dashboard/GetLowStockAlertsController.php:11
 * @route /api/dashboard/low-stock-alerts
 */
const GetLowStockAlertsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetLowStockAlertsController.url(options),
    method: 'get',
})

GetLowStockAlertsController.definition = {
    methods: ['get','head'],
    url: '\/api\/dashboard\/low-stock-alerts',
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController::GetLowStockAlertsController
 * @see app/Http/Controllers/Api/Dashboard/GetLowStockAlertsController.php:11
 * @route /api/dashboard/low-stock-alerts
 */
GetLowStockAlertsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetLowStockAlertsController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController::GetLowStockAlertsController
 * @see app/Http/Controllers/Api/Dashboard/GetLowStockAlertsController.php:11
 * @route /api/dashboard/low-stock-alerts
 */
GetLowStockAlertsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetLowStockAlertsController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController::GetLowStockAlertsController
 * @see app/Http/Controllers/Api/Dashboard/GetLowStockAlertsController.php:11
 * @route /api/dashboard/low-stock-alerts
 */
GetLowStockAlertsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetLowStockAlertsController.url(options),
    method: 'head',
})

export default GetLowStockAlertsController