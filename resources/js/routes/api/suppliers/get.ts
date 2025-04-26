import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController::get
 * @see app/Http/Controllers/Api/Supplier/GetSupplierPaginatedController.php:15
 * @route /api/suppliers
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
    url: '\/api\/suppliers',
}

/**
 * @see \App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController::get
 * @see app/Http/Controllers/Api/Supplier/GetSupplierPaginatedController.php:15
 * @route /api/suppliers
 */
get.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return get.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController::get
 * @see app/Http/Controllers/Api/Supplier/GetSupplierPaginatedController.php:15
 * @route /api/suppliers
 */
get.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: get.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController::get
 * @see app/Http/Controllers/Api/Supplier/GetSupplierPaginatedController.php:15
 * @route /api/suppliers
 */
get.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: get.url(options),
    method: 'head',
})

export default get