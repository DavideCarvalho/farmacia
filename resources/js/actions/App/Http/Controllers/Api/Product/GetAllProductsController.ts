import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Product\GetAllProductsController::GetAllProductsController
 * @see app/Http/Controllers/Api/Product/GetAllProductsController.php:11
 * @route /api/products/all
 */
const GetAllProductsController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetAllProductsController.url(options),
    method: 'get',
})

GetAllProductsController.definition = {
    methods: ['get','head'],
    url: '\/api\/products\/all',
}

/**
 * @see \App\Http\Controllers\Api\Product\GetAllProductsController::GetAllProductsController
 * @see app/Http/Controllers/Api/Product/GetAllProductsController.php:11
 * @route /api/products/all
 */
GetAllProductsController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetAllProductsController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Product\GetAllProductsController::GetAllProductsController
 * @see app/Http/Controllers/Api/Product/GetAllProductsController.php:11
 * @route /api/products/all
 */
GetAllProductsController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetAllProductsController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Product\GetAllProductsController::GetAllProductsController
 * @see app/Http/Controllers/Api/Product/GetAllProductsController.php:11
 * @route /api/products/all
 */
GetAllProductsController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetAllProductsController.url(options),
    method: 'head',
})

export default GetAllProductsController