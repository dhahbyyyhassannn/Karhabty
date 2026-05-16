<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleVenteController;


Route::post('/logIn', [UserController::class, 'logIn']);
Route::post('/signIn', [UserController::class, 'addUser']);
Route::middleware('auth:api')->post('/vehicles/addCar', [VehicleVenteController::class, 'addVehicle']);
Route::middleware('auth:api')->post('/vehicles/location', [VehicleVenteController::class, 'storeRental']);
Route::get("/test", function () {
    return "API Working";
});
