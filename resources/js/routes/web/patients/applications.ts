import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see routes/web.php:53
 * @route /patients/applications
 */
export const applications = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: applications.url(options),
    method: 'get',
})

applications.definition = {
    methods: ['get','head'],
    url: '\/patients\/applications',
}

/**
 * @see routes/web.php:53
 * @route /patients/applications
 */
applications.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return applications.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:53
 * @route /patients/applications
 */
applications.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: applications.url(options),
    method: 'get',
})

/**
 * @see routes/web.php:53
 * @route /patients/applications
 */
applications.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: applications.url(options),
    method: 'head',
})

export default applications