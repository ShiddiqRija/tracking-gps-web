<?php

use App\Http\Controllers\DeviceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Setting\WifiController;
use App\Models\Position;
use App\Models\Wifi;
use Illuminate\Foundation\Application;
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

Route::resource('devices', DeviceController::class)
    ->only(['index', 'store', 'edit', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::resource('messages', MessageController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::prefix('settings')->group(function () {
    Route::resource('wifi', WifiController::class)
        ->only(['index', 'store', 'edit', 'update', 'destroy']);
})->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/testing', function () {
    $position = Position::where('id', 1832)->first();

    // $nearestLocation = '';
    // if ($position->network == null) {
    //     $nearestLocation = 'Outdoor';
    // } else {
    //     $network = json_decode($position->network, true);
    //     $wifis = Wifi::all();

    //     foreach ($network['wifiAccessPoints'] as $wifiAP) {
    //         if ($nearestLocation == '') {
    //             foreach ($wifis as $wifi) {
    //                 $mac = strtolower($wifi->mac);
    //                 if ($wifiAP['macAddress'] === $mac) {
    //                     $nearestLocation = $wifi->location_name;
    //                 }
    //             }
    //         } else {
    //             break;
    //         }
    //     }

    //     if ($nearestLocation == '') {
    //         $nearestLocation = 'Outdoor';
    //     }
    // }

    return $position->network;
});

require __DIR__ . '/auth.php';
