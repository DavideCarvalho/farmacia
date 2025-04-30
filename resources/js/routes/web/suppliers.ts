import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see routes/web.php:42
 * @route /suppliers
 */
export const suppliers = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: suppliers.url(options),
    method: 'get',
})

suppliers.definition = {
    methods: ['get','head'],
    url: '\/suppliers',
}

/**
 * @see routes/web.php:42
 * @route /suppliers
 */
suppliers.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return suppliers.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:42
 * @route /suppliers
 */
suppliers.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: suppliers.url(options),
    method: 'get',
})

/**
 * @see routes/web.php:42
 * @route /suppliers
 */
suppliers.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: suppliers.url(options),
    method: 'head',
})

export default suppliers