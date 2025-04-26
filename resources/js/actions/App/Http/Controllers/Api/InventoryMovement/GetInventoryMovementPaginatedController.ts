import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController::GetInventoryMovementPaginatedController
 * @see app/Http/Controllers/Api/InventoryMovement/GetInventoryMovementPaginatedController.php:16
 * @route /api/inventory-movements
 */
const GetInventoryMovementPaginatedController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetInventoryMovementPaginatedController.url(options),
    method: 'get',
})

GetInventoryMovementPaginatedController.definition = {
    methods: ['get','head'],
    url: '\/api\/inventory-movements',
}

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController::GetInventoryMovementPaginatedController
 * @see app/Http/Controllers/Api/InventoryMovement/GetInventoryMovementPaginatedController.php:16
 * @route /api/inventory-movements
 */
GetInventoryMovementPaginatedController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetInventoryMovementPaginatedController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController::GetInventoryMovementPaginatedController
 * @see app/Http/Controllers/Api/InventoryMovement/GetInventoryMovementPaginatedController.php:16
 * @route /api/inventory-movements
 */
GetInventoryMovementPaginatedController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetInventoryMovementPaginatedController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController::GetInventoryMovementPaginatedController
 * @see app/Http/Controllers/Api/InventoryMovement/GetInventoryMovementPaginatedController.php:16
 * @route /api/inventory-movements
 */
GetInventoryMovementPaginatedController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetInventoryMovementPaginatedController.url(options),
    method: 'head',
})

export default GetInventoryMovementPaginatedController