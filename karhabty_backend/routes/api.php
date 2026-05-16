<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleVenteController;
use App\Http\Controllers\VehicleLocationController;

Route::post('/logIn', [UserController::class, 'logIn']);
Route::post('/signIn', [UserController::class, 'addUser']);
Route::middleware('auth:api')->post('/vehicles/addCar', [VehicleVenteController::class, 'addVehicle']);
Route::middleware('auth:api')->post('/vehcles/addLocation/Car', [VehicleLocationController::class, 'addVehcileLocation']);
Route::get("/test", function () {
    return "API Working";
});
