import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController::GetSupplierPaginatedController
 * @see app/Http/Controllers/Api/Supplier/GetSupplierPaginatedController.php:15
 * @route /api/suppliers
 */
const GetSupplierPaginatedController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetSupplierPaginatedController.url(options),
    method: 'get',
})

GetSupplierPaginatedController.definition = {
    methods: ['get','head'],
    url: '\/api\/suppliers',
}

/**
 * @see \App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController::GetSupplierPaginatedController
 * @see app/Http/Controllers/Api/Supplier/GetSupplierPaginatedController.php:15
 * @route /api/suppliers
 */
GetSupplierPaginatedController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetSupplierPaginatedController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController::GetSupplierPaginatedController
 * @see app/Http/Controllers/Api/Supplier/GetSupplierPaginatedController.php:15
 * @route /api/suppliers
 */
GetSupplierPaginatedController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetSupplierPaginatedController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController::GetSupplierPaginatedController
 * @see app/Http/Controllers/Api/Supplier/GetSupplierPaginatedController.php:15
 * @route /api/suppliers
 */
GetSupplierPaginatedController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetSupplierPaginatedController.url(options),
    method: 'head',
})

export default GetSupplierPaginatedController