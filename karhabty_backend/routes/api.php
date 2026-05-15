<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::post('/logIn', [UserController::class, 'logIn']);
route::middleware('auth:api')->get('/profil', function () {
    return auth()->user();
});
Route::post('/signIn', [UserController::class, 'addUser']);
Route::get("/test", function () {
    return "API Working";
});
