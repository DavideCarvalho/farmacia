import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \Spatie\WebTinker\Http\Controllers\WebTinkerController::index
 * @see vendor/spatie/laravel-web-tinker/src/Http/Controllers/WebTinkerController.php:11
 * @route /tinker
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
    url: '\/tinker',
}

/**
 * @see \Spatie\WebTinker\Http\Controllers\WebTinkerController::index
 * @see vendor/spatie/laravel-web-tinker/src/Http/Controllers/WebTinkerController.php:11
 * @route /tinker
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Spatie\WebTinker\Http\Controllers\WebTinkerController::index
 * @see vendor/spatie/laravel-web-tinker/src/Http/Controllers/WebTinkerController.php:11
 * @route /tinker
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Spatie\WebTinker\Http\Controllers\WebTinkerController::index
 * @see vendor/spatie/laravel-web-tinker/src/Http/Controllers/WebTinkerController.php:11
 * @route /tinker
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
 * @see \Spatie\WebTinker\Http\Controllers\WebTinkerController::execute
 * @see vendor/spatie/laravel-web-tinker/src/Http/Controllers/WebTinkerController.php:18
 * @route /tinker
 */
export const execute = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: execute.url(options),
    method: 'post',
})

execute.definition = {
    methods: ['post'],
    url: '\/tinker',
}

/**
 * @see \Spatie\WebTinker\Http\Controllers\WebTinkerController::execute
 * @see vendor/spatie/laravel-web-tinker/src/Http/Controllers/WebTinkerController.php:18
 * @route /tinker
 */
execute.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return execute.definition.url + queryParams(options)
}

/**
 * @see \Spatie\WebTinker\Http\Controllers\WebTinkerController::execute
 * @see vendor/spatie/laravel-web-tinker/src/Http/Controllers/WebTinkerController.php:18
 * @route /tinker
 */
execute.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: execute.url(options),
    method: 'post',
})

const WebTinkerController = { index, execute }

export default WebTinkerController