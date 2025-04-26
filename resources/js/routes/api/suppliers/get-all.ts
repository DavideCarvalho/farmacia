import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Supplier\GetAllSuppliersController::getAll
 * @see app/Http/Controllers/Api/Supplier/GetAllSuppliersController.php:11
 * @route /api/suppliers/all
 */
export const getAll = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getAll.url(options),
    method: 'get',
})

getAll.definition = {
    methods: ['get','head'],
    url: '\/api\/suppliers\/all',
}

/**
 * @see \App\Http\Controllers\Api\Supplier\GetAllSuppliersController::getAll
 * @see app/Http/Controllers/Api/Supplier/GetAllSuppliersController.php:11
 * @route /api/suppliers/all
 */
getAll.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return getAll.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Supplier\GetAllSuppliersController::getAll
 * @see app/Http/Controllers/Api/Supplier/GetAllSuppliersController.php:11
 * @route /api/suppliers/all
 */
getAll.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: getAll.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Supplier\GetAllSuppliersController::getAll
 * @see app/Http/Controllers/Api/Supplier/GetAllSuppliersController.php:11
 * @route /api/suppliers/all
 */
getAll.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: getAll.url(options),
    method: 'head',
})

export default getAll