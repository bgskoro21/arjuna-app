<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(UserController::class)->group(function(){
        Route::get("/users", "index")->name('users.index');
        Route::get("/users/create", "create")->name('users.create');
        Route::post("/users", "store")->name('users.store');
        Route::get("/users/{user}", "edit")->name('users.edit');
        Route::put("/users/{user}", "update")->name('users.update');
    });
});


require __DIR__.'/settings.php';
