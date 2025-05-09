import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \LakM\Comments\Http\Controllers\VerifyGuestController::verifyGuest
 * @see vendor/lakm/laravel-comments/src/Http/Controllers/VerifyGuestController.php:11
 * @route /verify-guest
 */
export const verifyGuest = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: verifyGuest.url(options),
    method: 'get',
})

verifyGuest.definition = {
    methods: ['get','head'],
    url: '\/verify-guest',
}

/**
 * @see \LakM\Comments\Http\Controllers\VerifyGuestController::verifyGuest
 * @see vendor/lakm/laravel-comments/src/Http/Controllers/VerifyGuestController.php:11
 * @route /verify-guest
 */
verifyGuest.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return verifyGuest.definition.url + queryParams(options)
}

/**
 * @see \LakM\Comments\Http\Controllers\VerifyGuestController::verifyGuest
 * @see vendor/lakm/laravel-comments/src/Http/Controllers/VerifyGuestController.php:11
 * @route /verify-guest
 */
verifyGuest.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: verifyGuest.url(options),
    method: 'get',
})

/**
 * @see \LakM\Comments\Http\Controllers\VerifyGuestController::verifyGuest
 * @see vendor/lakm/laravel-comments/src/Http/Controllers/VerifyGuestController.php:11
 * @route /verify-guest
 */
verifyGuest.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: verifyGuest.url(options),
    method: 'head',
})

export default verifyGuest