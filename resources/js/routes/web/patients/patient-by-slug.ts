import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see routes/web.php:55
 * @route /patients/{slug}
 */
export const patientBySlug = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: patientBySlug.url(args, options),
    method: 'get',
})

patientBySlug.definition = {
    methods: ['get','head'],
    url: '\/patients\/{slug}',
}

/**
 * @see routes/web.php:55
 * @route /patients/{slug}
 */
patientBySlug.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return patientBySlug.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:55
 * @route /patients/{slug}
 */
patientBySlug.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: patientBySlug.url(args, options),
    method: 'get',
})

/**
 * @see routes/web.php:55
 * @route /patients/{slug}
 */
patientBySlug.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: patientBySlug.url(args, options),
    method: 'head',
})

export default patientBySlug