<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\stateController;
use App\Http\Controllers\Api\userController;
use App\Http\Controllers\Api\taskController;

// CRUD for users
Route::get('/user', [userController::class, 'findAll']);
Route::post('/user', [userController::class, 'save']);
Route::get('/user/{id}', [userController::class, 'findOne']);
Route::put('/user/{id}', [userController::class, 'update']);
Route::patch('/user/{id}', [userController::class, 'updateParcial']);
Route::delete('/user/{id}', [userController::class, 'destroy']);


// CRUD for tasks
Route::get('/task', [taskController::class, 'findAll']);
Route::post('/task', [taskController::class, 'save']);
Route::get('/task/{id}', [taskController::class, 'findOne']);
Route::put('/task/{id}', [taskController::class, 'update']);
Route::patch('/task/{id}', [taskController::class, 'updateParcial']);
Route::delete('/task/{id}', [taskController::class, 'destroy']);


// CRUD for State
Route::get('/state', [stateController::class, 'findAll']);
Route::post('/state', [stateController::class, 'save']);
Route::get('/state/{id}', [stateController::class, 'findOne']);
Route::put('/state/{id}', [stateController::class, 'update']);
Route::patch('/state/{id}', [stateController::class, 'updateParcial']);
Route::delete('/state/{id}', [stateController::class, 'destroy']);