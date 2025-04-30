import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see routes/web.php:38
 * @route /inventory-movements
 */
export const inventoryMovements = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: inventoryMovements.url(options),
    method: 'get',
})

inventoryMovements.definition = {
    methods: ['get','head'],
    url: '\/inventory-movements',
}

/**
 * @see routes/web.php:38
 * @route /inventory-movements
 */
inventoryMovements.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return inventoryMovements.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:38
 * @route /inventory-movements
 */
inventoryMovements.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: inventoryMovements.url(options),
    method: 'get',
})

/**
 * @see routes/web.php:38
 * @route /inventory-movements
 */
inventoryMovements.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: inventoryMovements.url(options),
    method: 'head',
})

export default inventoryMovements