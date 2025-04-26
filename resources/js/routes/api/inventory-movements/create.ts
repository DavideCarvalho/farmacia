import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\CreateInventoryMovementController::create
 * @see app/Http/Controllers/Api/InventoryMovement/CreateInventoryMovementController.php:16
 * @route /api/inventory-movements
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ['post'],
    url: '\/api\/inventory-movements',
}

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\CreateInventoryMovementController::create
 * @see app/Http/Controllers/Api/InventoryMovement/CreateInventoryMovementController.php:16
 * @route /api/inventory-movements
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\CreateInventoryMovementController::create
 * @see app/Http/Controllers/Api/InventoryMovement/CreateInventoryMovementController.php:16
 * @route /api/inventory-movements
 */
create.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: create.url(options),
    method: 'post',
})

export default create