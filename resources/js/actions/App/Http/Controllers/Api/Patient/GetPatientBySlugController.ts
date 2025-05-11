import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientBySlugController::GetPatientBySlugController
 * @see app/Http/Controllers/Api/Patient/GetPatientBySlugController.php:11
 * @route /api/patients/{slug}
 */
const GetPatientBySlugController = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPatientBySlugController.url(args, options),
    method: 'get',
})

GetPatientBySlugController.definition = {
    methods: ['get','head'],
    url: '\/api\/patients\/{slug}',
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientBySlugController::GetPatientBySlugController
 * @see app/Http/Controllers/Api/Patient/GetPatientBySlugController.php:11
 * @route /api/patients/{slug}
 */
GetPatientBySlugController.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return GetPatientBySlugController.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientBySlugController::GetPatientBySlugController
 * @see app/Http/Controllers/Api/Patient/GetPatientBySlugController.php:11
 * @route /api/patients/{slug}
 */
GetPatientBySlugController.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetPatientBySlugController.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\GetPatientBySlugController::GetPatientBySlugController
 * @see app/Http/Controllers/Api/Patient/GetPatientBySlugController.php:11
 * @route /api/patients/{slug}
 */
GetPatientBySlugController.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetPatientBySlugController.url(args, options),
    method: 'head',
})

export default GetPatientBySlugController