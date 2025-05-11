import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientBySlugController::getBySlug
 * @see app/Http/Controllers/Api/Patient/GetPatientBySlugController.php:12
 * @route /api/patients/{slug}
 */
export const getBySlug = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getBySlug.url(args, options),
    method: 'get',
})

getBySlug.definition = {
    methods: ['get','head'],
    url: '\/api\/patients\/{slug}',
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientBySlugController::getBySlug
 * @see app/Http/Controllers/Api/Patient/GetPatientBySlugController.php:12
 * @route /api/patients/{slug}
 */
getBySlug.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    if (Array.isArray(args)) {
        args = {
            slug: args[0],
        }
    }

    const parsedArgs = {
        slug: args.slug,
    }

    return getBySlug.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientBySlugController::getBySlug
 * @see app/Http/Controllers/Api/Patient/GetPatientBySlugController.php:12
 * @route /api/patients/{slug}
 */
getBySlug.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getBySlug.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientBySlugController::getBySlug
 * @see app/Http/Controllers/Api/Patient/GetPatientBySlugController.php:12
 * @route /api/patients/{slug}
 */
getBySlug.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: getBySlug.url(args, options),
    method: 'head',
})

export default getBySlug