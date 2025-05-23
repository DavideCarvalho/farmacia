import store from './store'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:47
 * @route /horizon/api/monitoring
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/horizon\/api\/monitoring',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:47
 * @route /horizon/api/monitoring
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:47
 * @route /horizon/api/monitoring
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:47
 * @route /horizon/api/monitoring
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const monitoring = {
    index, 
    store,
}

export default monitoring