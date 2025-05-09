import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \LakM\Comments\Http\Controllers\VerifyGuestController::VerifyGuestController
 * @see vendor/lakm/laravel-comments/src/Http/Controllers/VerifyGuestController.php:11
 * @route /verify-guest
 */
const VerifyGuestController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: VerifyGuestController.url(options),
    method: 'get',
})

VerifyGuestController.definition = {
    methods: ['get','head'],
    url: '\/verify-guest',
}

/**
 * @see \LakM\Comments\Http\Controllers\VerifyGuestController::VerifyGuestController
 * @see vendor/lakm/laravel-comments/src/Http/Controllers/VerifyGuestController.php:11
 * @route /verify-guest
 */
VerifyGuestController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return VerifyGuestController.definition.url + queryParams(options)
}

/**
 * @see \LakM\Comments\Http\Controllers\VerifyGuestController::VerifyGuestController
 * @see vendor/lakm/laravel-comments/src/Http/Controllers/VerifyGuestController.php:11
 * @route /verify-guest
 */
VerifyGuestController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: VerifyGuestController.url(options),
    method: 'get',
})

/**
 * @see \LakM\Comments\Http\Controllers\VerifyGuestController::VerifyGuestController
 * @see vendor/lakm/laravel-comments/src/Http/Controllers/VerifyGuestController.php:11
 * @route /verify-guest
 */
VerifyGuestController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: VerifyGuestController.url(options),
    method: 'head',
})

export default VerifyGuestController