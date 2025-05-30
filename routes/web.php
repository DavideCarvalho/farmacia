<?php

use App\Http\Controllers\Api\Department\GetAllDepartmentsController;
use App\Http\Controllers\Api\Patient\GetPatientPaginatedController;
use App\Http\Controllers\Api\Patient\CreatePatientController;
use App\Http\Controllers\Api\Patient\GetPatientBySlugController;
use App\Http\Controllers\Api\PatientApplication\GetPatientApplicationPaginatedController;
use App\Http\Controllers\Api\PatientApplication\CreatePatientApplicationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\Product\GetAllProductsController;
use App\Http\Controllers\Api\InventoryMovement\CreateInventoryMovementController;
use App\Http\Controllers\Api\InventoryMovement\GetInventoryMovementPaginatedController;
use App\Http\Controllers\Api\Department\GetDepartmentPaginatedController;
use App\Http\Controllers\Api\Supplier\GetSupplierPaginatedController;
use App\Http\Controllers\Api\Supplier\CreateSupplierController;
use App\Http\Controllers\Api\Supplier\GetAllSuppliersController;
use App\Http\Controllers\Api\Patient\GetAllPatientsController;
use App\Http\Controllers\Api\Dashboard\GetPotentialSavingsController;
use App\Http\Controllers\Api\Dashboard\GetLowStockAlertsController;
use App\Http\Controllers\Api\Dashboard\GetExpiringMedicinesController;
use App\Http\Controllers\Api\Dashboard\HighOccupancyDepartmentsController;
use App\Http\Controllers\Api\Patient\GetPatientHospitalStayPaginatedController;
use App\Http\Controllers\Api\Patient\CreatePatientHospitalStayController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->name('web.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('departments', function () {
        return Inertia::render('departments/index');
    })->name('departments');

    Route::get('inventory-movements', function () {
        return Inertia::render('inventory-movements/index');
    })->name('inventory-movements');

    Route::get('suppliers', function () {
        return Inertia::render('suppliers/index');
    })->name('suppliers');

    Route::get('hospital-stays', function () {
        return Inertia::render('hospital-stays/index');
    })->name('hospital-stays');

    Route::get('patients', function () {
        return Inertia::render('patients/index');
    })->name('patients');

    Route::get('patients/{slug}', function ($slug) {
        return Inertia::render('patients/[patient-slug]/index', ['slug' => $slug]);
    })->name('patients.patient-by-slug');

    Route::get('patients/applications', function () {
        return Inertia::render('patients/applications/index');
    })->name('patients.applications');
});

Route::middleware(['auth'])->name('api.')->prefix('api')->group(function () {
    // Rotas de Produtos
    Route::name('products.')->prefix('products')->group(function () {
        Route::get('/all', GetAllProductsController::class)->name('get-all');
    });

    // Rotas de Movimentações de Estoque
    Route::name('inventory-movements.')->prefix('inventory-movements')->group(function () {
        Route::get('/', GetInventoryMovementPaginatedController::class)->name('get');
        Route::post('/', CreateInventoryMovementController::class)->name('create');
    });

    // Rotas de Setores
    Route::name('departments.')->prefix('departments')->group(function () {
        Route::get('/', GetDepartmentPaginatedController::class)->name('get');
        Route::get('/all', GetAllDepartmentsController::class)->name('get-all');
    });

    // Rotas de Fornecedores
    Route::name('suppliers.')->prefix('suppliers')->group(function () {
        Route::get('/', GetSupplierPaginatedController::class)->name('get');
        Route::get('/all', GetAllSuppliersController::class)->name('get-all');
        Route::post('/', CreateSupplierController::class)->name('create');
    });

    // Rotas de Pacientes
    Route::name('patients.')->prefix('patients')->group(function () {
        Route::get('/', GetPatientPaginatedController::class)->name('get');
        Route::get('/all', GetAllPatientsController::class)->name('get-all');
        Route::get('/{slug}', GetPatientBySlugController::class)->name('get-by-slug');
        Route::post('/', CreatePatientController::class)->name('create');
        Route::post('/{patient}/observations', App\Http\Controllers\Api\PatientObservationController::class)->name('observations.store');
    });

    // Rotas de Internações
    Route::name('hospital-stays.')->prefix('hospital-stays')->group(function () {
        Route::get('/', GetPatientHospitalStayPaginatedController::class)->name('get');
        Route::post('/', CreatePatientHospitalStayController::class)->name('create');
    });

    // Rotas de Aplicações de Pacientes
    Route::name('patient-applications.')->prefix('patient-applications')->group(function () {
        Route::get('/', GetPatientApplicationPaginatedController::class)->name('get');
        Route::post('/', CreatePatientApplicationController::class)->name('create');
    });

    // Rotas do Dashboard
    Route::name('dashboard.')->prefix('dashboard')->group(function () {
        Route::get('/potential-savings', GetPotentialSavingsController::class)->name('potential-savings');
        Route::get('/low-stock-alerts', GetLowStockAlertsController::class)->name('low-stock-alerts');
        Route::get('/expiring-medicines', GetExpiringMedicinesController::class)->name('expiring-medicines');
        Route::get('/high-occupancy-departments', HighOccupancyDepartmentsController::class)->name('high-occupancy-departments');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
