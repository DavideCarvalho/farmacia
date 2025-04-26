import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController::lowStockAlerts
 * @see app/Http/Controllers/Api/Dashboard/GetLowStockAlertsController.php:11
 * @route /api/dashboard/low-stock-alerts
 */
export const lowStockAlerts = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: lowStockAlerts.url(options),
    method: 'get',
})

lowStockAlerts.definition = {
    methods: ['get','head'],
    url: '\/api\/dashboard\/low-stock-alerts',
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController::lowStockAlerts
 * @see app/Http/Controllers/Api/Dashboard/GetLowStockAlertsController.php:11
 * @route /api/dashboard/low-stock-alerts
 */
lowStockAlerts.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return lowStockAlerts.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController::lowStockAlerts
 * @see app/Http/Controllers/Api/Dashboard/GetLowStockAlertsController.php:11
 * @route /api/dashboard/low-stock-alerts
 */
lowStockAlerts.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: lowStockAlerts.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController::lowStockAlerts
 * @see app/Http/Controllers/Api/Dashboard/GetLowStockAlertsController.php:11
 * @route /api/dashboard/low-stock-alerts
 */
lowStockAlerts.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: lowStockAlerts.url(options),
    method: 'head',
})

export default lowStockAlerts