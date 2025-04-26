import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Supplier\GetAllSuppliersController::GetAllSuppliersController
 * @see app/Http/Controllers/Api/Supplier/GetAllSuppliersController.php:11
 * @route /api/suppliers/all
 */
const GetAllSuppliersController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetAllSuppliersController.url(options),
    method: 'get',
})

GetAllSuppliersController.definition = {
    methods: ['get','head'],
    url: '\/api\/suppliers\/all',
}

/**
 * @see \App\Http\Controllers\Api\Supplier\GetAllSuppliersController::GetAllSuppliersController
 * @see app/Http/Controllers/Api/Supplier/GetAllSuppliersController.php:11
 * @route /api/suppliers/all
 */
GetAllSuppliersController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetAllSuppliersController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Supplier\GetAllSuppliersController::GetAllSuppliersController
 * @see app/Http/Controllers/Api/Supplier/GetAllSuppliersController.php:11
 * @route /api/suppliers/all
 */
GetAllSuppliersController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetAllSuppliersController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Supplier\GetAllSuppliersController::GetAllSuppliersController
 * @see app/Http/Controllers/Api/Supplier/GetAllSuppliersController.php:11
 * @route /api/suppliers/all
 */
GetAllSuppliersController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetAllSuppliersController.url(options),
    method: 'head',
})

export default GetAllSuppliersController