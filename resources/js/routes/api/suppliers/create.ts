import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Supplier\CreateSupplierController::create
 * @see app/Http/Controllers/Api/Supplier/CreateSupplierController.php:12
 * @route /api/suppliers
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
    url: '\/api\/suppliers',
}

/**
 * @see \App\Http\Controllers\Api\Supplier\CreateSupplierController::create
 * @see app/Http/Controllers/Api/Supplier/CreateSupplierController.php:12
 * @route /api/suppliers
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Supplier\CreateSupplierController::create
 * @see app/Http/Controllers/Api/Supplier/CreateSupplierController.php:12
 * @route /api/suppliers
 */
create.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: create.url(options),
    method: 'post',
})

export default create