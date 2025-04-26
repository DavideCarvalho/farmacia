import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Patient\ShowPatientController::show
 * @see app/Http/Controllers/Api/Patient/ShowPatientController.php:10
 * @route /api/patients/{patient}
 */
export const show = (args: { patient: string | { id: string } } | [patient: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/api\/patients\/{patient}',
}

/**
 * @see \App\Http\Controllers\Api\Patient\ShowPatientController::show
 * @see app/Http/Controllers/Api/Patient/ShowPatientController.php:10
 * @route /api/patients/{patient}
 */
show.url = (args: { patient: string | { id: string } } | [patient: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { patient: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            patient: args[0],
        }
    }

    const parsedArgs = {
        patient: typeof args.patient === 'object'
            ? args.patient.id
            : args.patient,
    }

    return show.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Patient\ShowPatientController::show
 * @see app/Http/Controllers/Api/Patient/ShowPatientController.php:10
 * @route /api/patients/{patient}
 */
show.get = (args: { patient: string | { id: string } } | [patient: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Patient\ShowPatientController::show
 * @see app/Http/Controllers/Api/Patient/ShowPatientController.php:10
 * @route /api/patients/{patient}
 */
show.head = (args: { patient: string | { id: string } } | [patient: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show