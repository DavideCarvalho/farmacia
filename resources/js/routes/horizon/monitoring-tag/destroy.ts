import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::destroy
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:111
 * @route /horizon/api/monitoring/{tag}
 */
export const destroy = (args: { tag: string | number } | [tag: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/horizon\/api\/monitoring\/{tag}',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::destroy
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:111
 * @route /horizon/api/monitoring/{tag}
 */
destroy.url = (args: { tag: string | number } | [tag: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tag: args }
    }

    if (Array.isArray(args)) {
        args = {
            tag: args[0],
        }
    }

    const parsedArgs = {
        tag: args.tag,
    }

    return destroy.definition.url
            .replace('{tag}', parsedArgs.tag.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::destroy
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:111
 * @route /horizon/api/monitoring/{tag}
 */
destroy.delete = (args: { tag: string | number } | [tag: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

export default destroy