import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\CreateInventoryMovementController::CreateInventoryMovementController
 * @see app/Http/Controllers/Api/InventoryMovement/CreateInventoryMovementController.php:16
 * @route /api/inventory-movements
 */
const CreateInventoryMovementController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreateInventoryMovementController.url(options),
    method: 'post',
})

CreateInventoryMovementController.definition = {
    methods: ['post'],
    url: '\/api\/inventory-movements',
}

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\CreateInventoryMovementController::CreateInventoryMovementController
 * @see app/Http/Controllers/Api/InventoryMovement/CreateInventoryMovementController.php:16
 * @route /api/inventory-movements
 */
CreateInventoryMovementController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return CreateInventoryMovementController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\InventoryMovement\CreateInventoryMovementController::CreateInventoryMovementController
 * @see app/Http/Controllers/Api/InventoryMovement/CreateInventoryMovementController.php:16
 * @route /api/inventory-movements
 */
CreateInventoryMovementController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreateInventoryMovementController.url(options),
    method: 'post',
})

export default CreateInventoryMovementController