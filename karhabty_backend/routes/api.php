<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleVenteController;
use App\Http\Controllers\VehicleLocationController;
use App\Http\Controllers\SocieteController;
use App\Http\Controllers\AdminController;

Route::post('/logIn', [UserController::class, 'logIn']);
Route::post('/signIn', [UserController::class, 'addUser']);
Route::middleware('auth:api')->post('/vehicles/addCar', [VehicleVenteController::class, 'addVehicle']);
Route::middleware('auth:api')->post('/vehcles/addLocation/Car', [VehicleLocationController::class, 'addVehcileLocation']);
Route::get('/test', function () {
    return 'API Working';
});

// Societe routes
Route::get('/societes', [SocieteController::class, 'index']);
Route::post('/societes', [SocieteController::class, 'addSociete']);
Route::post('/societes/login', [SocieteController::class, 'logInSociete']);
Route::get('/societes/{societe}/vehicules', [SocieteController::class, 'vehicles']);
Route::post('/societes/{societe}/vehicules', [SocieteController::class, 'storeVehicle']);
Route::put('/societes/{societe}/vehicules/{matricule}', [SocieteController::class, 'updateVehicle']);
Route::delete('/societes/{societe}/vehicules/{matricule}', [SocieteController::class, 'deleteVehicle']);

// Admin routes
Route::post('/admin/login', [AdminController::class, 'login']);
Route::middleware('auth:api')->group(function () {
    Route::get('/admin/users', [AdminController::class, 'users']);
    Route::get('/admin/societes', [AdminController::class, 'societes']);
    Route::patch('/admin/users/{userId}/suspend', [AdminController::class, 'suspendUser']);
    Route::delete('/admin/users/{userId}', [AdminController::class, 'deleteUser']);
    Route::patch('/admin/societes/{societeId}/suspend', [AdminController::class, 'suspendSociete']);
    Route::delete('/admin/societes/{societeId}', [AdminController::class, 'deleteSociete']);
});

