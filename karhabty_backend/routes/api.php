<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleListingController;


Route::post('/logIn', [UserController::class, 'logIn']);
route::middleware('auth:api')->get('/profil', function () {
    return auth()->user();
});
Route::post('/signIn', [UserController::class, 'addUser']);
Route::middleware('auth:api')->post('/vehicules/vente', [VehicleListingController::class, 'storeSale']);
Route::middleware('auth:api')->post('/vehicules/location', [VehicleListingController::class, 'storeRental']);
Route::get("/test", function () {
    return "API Working";
});
