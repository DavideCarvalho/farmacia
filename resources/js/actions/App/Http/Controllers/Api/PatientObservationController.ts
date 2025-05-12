import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\PatientObservationController::PatientObservationController
 * @see app/Http/Controllers/Api/PatientObservationController.php:18
 * @route /api/patients/{patient}/observations
 */
const PatientObservationController = (args: { patient: string | { id: string } } | [patient: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: PatientObservationController.url(args, options),
    method: 'post',
})

PatientObservationController.definition = {
    methods: ['post'],
    url: '\/api\/patients\/{patient}\/observations',
}

/**
 * @see \App\Http\Controllers\Api\PatientObservationController::PatientObservationController
 * @see app/Http/Controllers/Api/PatientObservationController.php:18
 * @route /api/patients/{patient}/observations
 */
PatientObservationController.url = (args: { patient: string | { id: string } } | [patient: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return PatientObservationController.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\PatientObservationController::PatientObservationController
 * @see app/Http/Controllers/Api/PatientObservationController.php:18
 * @route /api/patients/{patient}/observations
 */
PatientObservationController.post = (args: { patient: string | { id: string } } | [patient: string | { id: string }] | string | { id: string }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: PatientObservationController.url(args, options),
    method: 'post',
})

export default PatientObservationController