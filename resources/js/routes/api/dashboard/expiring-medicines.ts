import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController::expiringMedicines
 * @see app/Http/Controllers/Api/Dashboard/GetExpiringMedicinesController.php:14
 * @route /api/dashboard/expiring-medicines
 */
export const expiringMedicines = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: expiringMedicines.url(options),
    method: 'get',
})

expiringMedicines.definition = {
    methods: ['get','head'],
    url: '\/api\/dashboard\/expiring-medicines',
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController::expiringMedicines
 * @see app/Http/Controllers/Api/Dashboard/GetExpiringMedicinesController.php:14
 * @route /api/dashboard/expiring-medicines
 */
expiringMedicines.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return expiringMedicines.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController::expiringMedicines
 * @see app/Http/Controllers/Api/Dashboard/GetExpiringMedicinesController.php:14
 * @route /api/dashboard/expiring-medicines
 */
expiringMedicines.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: expiringMedicines.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController::expiringMedicines
 * @see app/Http/Controllers/Api/Dashboard/GetExpiringMedicinesController.php:14
 * @route /api/dashboard/expiring-medicines
 */
expiringMedicines.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: expiringMedicines.url(options),
    method: 'head',
})

export default expiringMedicines