import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController::get
 * @see app/Http/Controllers/Api/InventoryMovement/GetInventoryMovementPaginatedController.php:16
 * @route /api/inventory-movements
 */
export const get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

get.definition = {
    methods: ['get','head'],
    url: '\/api\/inventory-movements',
}

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController::get
 * @see app/Http/Controllers/Api/InventoryMovement/GetInventoryMovementPaginatedController.php:16
 * @route /api/inventory-movements
 */
get.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return get.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController::get
 * @see app/Http/Controllers/Api/InventoryMovement/GetInventoryMovementPaginatedController.php:16
 * @route /api/inventory-movements
 */
get.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController::get
 * @see app/Http/Controllers/Api/InventoryMovement/GetInventoryMovementPaginatedController.php:16
 * @route /api/inventory-movements
 */
get.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: get.url(options),
    method: 'head',
})

export default get