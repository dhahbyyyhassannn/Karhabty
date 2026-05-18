<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehiculeVenteController;
use App\Http\Controllers\VehiculeLocationController;
use App\Http\Controllers\SocieteController;
use App\Http\Controllers\AdminController;

Route::post('/logIn', [UserController::class, 'logIn']);
Route::post('/signIn', [UserController::class, 'addUser']);
Route::middleware('auth:api')->post('/vehicles/addCar', [VehiculeVenteController::class, 'addVehicule']);
Route::middleware('auth:api')->post('/vehcles/addLocation/Car', [VehiculeLocationController::class, 'addVehiculeLocation']);
Route::get('/allVehiculesLocation', [VehiculeLocationController::class, 'allVehiculesLocation']);
Route::get('/allVehiculesVente', [VehiculeVenteController::class, 'allVehiculesVente']);

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

