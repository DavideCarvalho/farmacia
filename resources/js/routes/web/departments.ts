import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see routes/web.php:34
 * @route /departments
 */
export const departments = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: departments.url(options),
    method: 'get',
})

departments.definition = {
    methods: ['get','head'],
    url: '\/departments',
}

/**
 * @see routes/web.php:34
 * @route /departments
 */
departments.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return departments.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:34
 * @route /departments
 */
departments.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: departments.url(options),
    method: 'get',
})

/**
 * @see routes/web.php:34
 * @route /departments
 */
departments.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: departments.url(options),
    method: 'head',
})

export default departments