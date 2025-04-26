import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Supplier\CreateSupplierController::CreateSupplierController
 * @see app/Http/Controllers/Api/Supplier/CreateSupplierController.php:12
 * @route /api/suppliers
 */
const CreateSupplierController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreateSupplierController.url(options),
    method: 'post',
})

CreateSupplierController.definition = {
    methods: ['post'],
    url: '\/api\/suppliers',
}

/**
 * @see \App\Http\Controllers\Api\Supplier\CreateSupplierController::CreateSupplierController
 * @see app/Http/Controllers/Api/Supplier/CreateSupplierController.php:12
 * @route /api/suppliers
 */
CreateSupplierController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return CreateSupplierController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Supplier\CreateSupplierController::CreateSupplierController
 * @see app/Http/Controllers/Api/Supplier/CreateSupplierController.php:12
 * @route /api/suppliers
 */
CreateSupplierController.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: CreateSupplierController.url(options),
    method: 'post',
})

export default CreateSupplierController