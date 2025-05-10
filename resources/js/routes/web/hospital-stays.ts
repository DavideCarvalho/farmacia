import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see routes/web.php:47
 * @route /hospital-stays
 */
export const hospitalStays = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: hospitalStays.url(options),
    method: 'get',
})

hospitalStays.definition = {
    methods: ['get','head'],
    url: '\/hospital-stays',
}

/**
 * @see routes/web.php:47
 * @route /hospital-stays
 */
hospitalStays.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return hospitalStays.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:47
 * @route /hospital-stays
 */
hospitalStays.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: hospitalStays.url(options),
    method: 'get',
})

/**
 * @see routes/web.php:47
 * @route /hospital-stays
 */
hospitalStays.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: hospitalStays.url(options),
    method: 'head',
})

export default hospitalStays