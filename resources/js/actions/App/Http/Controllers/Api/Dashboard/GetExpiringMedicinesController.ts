import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController::GetExpiringMedicinesController
 * @see app/Http/Controllers/Api/Dashboard/GetExpiringMedicinesController.php:14
 * @route /api/dashboard/expiring-medicines
 */
const GetExpiringMedicinesController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetExpiringMedicinesController.url(options),
    method: 'get',
})

GetExpiringMedicinesController.definition = {
    methods: ['get','head'],
    url: '\/api\/dashboard\/expiring-medicines',
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController::GetExpiringMedicinesController
 * @see app/Http/Controllers/Api/Dashboard/GetExpiringMedicinesController.php:14
 * @route /api/dashboard/expiring-medicines
 */
GetExpiringMedicinesController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return GetExpiringMedicinesController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController::GetExpiringMedicinesController
 * @see app/Http/Controllers/Api/Dashboard/GetExpiringMedicinesController.php:14
 * @route /api/dashboard/expiring-medicines
 */
GetExpiringMedicinesController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: GetExpiringMedicinesController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController::GetExpiringMedicinesController
 * @see app/Http/Controllers/Api/Dashboard/GetExpiringMedicinesController.php:14
 * @route /api/dashboard/expiring-medicines
 */
GetExpiringMedicinesController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: GetExpiringMedicinesController.url(options),
    method: 'head',
})

export default GetExpiringMedicinesController