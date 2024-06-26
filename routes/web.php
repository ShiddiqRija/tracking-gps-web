<?php

use App\Http\Controllers\DeviceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReplayController;
use App\Http\Controllers\Setting\AppLocationController;
use App\Http\Controllers\Setting\UserController;
use App\Http\Controllers\Setting\WifiController;
use App\Http\Resources\PositionCollection;
use App\Models\Device;
use App\Models\Wifi;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [PositionController::class, 'index'])->middleware(['auth', 'verified'])->name('positions.index');

Route::resource('/replay', ReplayController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('devices', DeviceController::class)
    ->only(['index', 'store', 'edit', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('messages', MessageController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::prefix('settings')->group(function () {
    Route::resource('wifi', WifiController::class)
        ->only(['index', 'store', 'edit', 'update', 'destroy'])
        ->middleware(['auth', 'verified']);
    Route::resource('location', AppLocationController::class)
        ->only(['index', 'update'])
        ->middleware(['auth', 'verified']);
    Route::resource('user', UserController::class)
        ->only(['index', 'store', 'edit', 'update', 'destroy'])
        ->middleware(['auth', 'verified']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/testing', function () {
//     return Inertia::render('Test/Index');
// });
// Route::get('/testing-replay', function () {
//     return Inertia::render('Test/Replay', [
//         'devices' => Device::all(),
//         'periods' => [
//             [
//                 'type' => 'Today'
//             ], [
//                 'type' => 'Custom'
//             ]
//         ],
//     ]);
// });
// Route::get('/testing-position', function () {
//     $devices = Device::all();

//     return Inertia::render('Test/Position', [
//         'devices' => new PositionCollection($devices)
//     ]);
// });

require __DIR__ . '/auth.php';
