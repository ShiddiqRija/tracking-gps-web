<?php

namespace App\Http\Controllers;

use App\Events\PositionUpdateEvent;
use App\Http\Resources\PositionCollection;
use App\Models\AppLocation;
use App\Models\Device;
use App\Models\Position;
use App\Models\Wifi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index()
    {
        $devices = Device::all();
        $locationInit = AppLocation::first();

        return Inertia::render('Position/Index', [
            'devices' => new PositionCollection($devices),
            'locationInit' => $locationInit
        ]);
    }

    public function store(Request $request)
    {
        $device = Device::where('device_id', $request->device_id)->first();

        if ($device) {
            try {
                DB::beginTransaction();

                $position = Position::create($request->all());
                $nearestLocation = '';

                if ($position->network == 'null') {
                    $nearestLocation = 'Outdoor';
                } else {
                    $network = json_decode($position->network, true);
                    $wifis = Wifi::all();

                    foreach ($network['wifiAccessPoints'] as $wifiAP) {
                        if ($nearestLocation == '') {
                            foreach ($wifis as $wifi) {
                                $mac = strtolower($wifi->mac);
                                if ($wifiAP['macAddress'] === $mac) {
                                    $nearestLocation = $wifi->location_name;
                                }
                            }
                        } else {
                            break;
                        }
                    }

                    if ($nearestLocation == '') {
                        $nearestLocation = 'Outdoor';
                    }
                }

                $position->update([
                    'location' => $nearestLocation,
                ]);

                $device->update([
                    'position_id' => $position->id,
                    'last_update' => round(microtime(true) * 1000)
                ]);

                DB::commit();

                Log::info(
                    '[OK] Add New Position',
                    ['data' => [
                        'position' => $position,
                        'device' => $device
                    ]]
                );

                $devices = Device::all();

                broadcast(new PositionUpdateEvent(new PositionCollection($devices)));

                return response()->json([
                    'success' => true,
                    'data' => $device,
                    'message' => 'Position added successfully'
                ]);
            } catch (\Exception $err) {
                DB::rollBack();

                Log::error(
                    '[FAILED] Add New Position',
                    ['error' => $err->getMessage()]
                );

                return response()->json([
                    'success' => false,
                    'data' => $err->getMessage(),
                    'message' => 'Failed to add position'
                ]);
            }
        } else {
            return response()->json([
                'success' => true,
                'data' => null,
                'message' => 'Device not found!'
            ]);
        }
    }
}
