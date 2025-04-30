import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see routes/web.php:47
 * @route /patients
 */
export const patients = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: patients.url(options),
    method: 'get',
})

patients.definition = {
    methods: ['get','head'],
    url: '\/patients',
}

/**
 * @see routes/web.php:47
 * @route /patients
 */
patients.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return patients.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:47
 * @route /patients
 */
patients.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: patients.url(options),
    method: 'get',
})

/**
 * @see routes/web.php:47
 * @route /patients
 */
patients.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: patients.url(options),
    method: 'head',
})

export default patients