<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\stateController;
use App\Http\Controllers\Api\userController;
use App\Http\Controllers\Api\taskController;

// CRUD for users
Route::get('/user', [userController::class, 'index']);
Route::post('/user', [userController::class, 'store']);
Route::get('/user/{id}', [userController::class, 'show']);
Route::put('/user/{id}', [userController::class, 'update']);
Route::patch('/user/{id}', [userController::class, 'updateParcial']);
Route::delete('/user/{id}', [userController::class, 'destroy']);


// CRUD for tasks
Route::get('/task', [taskController::class, 'index']);
Route::post('/task', [taskController::class, 'store']);
Route::get('/task/{id}', [taskController::class, 'show']);
Route::put('/task/{id}', [taskController::class, 'update']);
Route::patch('/task/{id}', [taskController::class, 'updateParcial']);
Route::delete('/task/{id}', [taskController::class, 'destroy']);


// CRUD for State
Route::get('/state', [stateController::class, 'index']);
Route::post('/state', [stateController::class, 'store']);
Route::get('/state/{id}', [stateController::class, 'show']);
Route::put('/state/{id}', [stateController::class, 'update']);
Route::delete('/state/{id}', [stateController::class, 'destroy']);