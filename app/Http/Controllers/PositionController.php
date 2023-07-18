<?php

namespace App\Http\Controllers;

use App\Http\Resources\PositionCollection;
use App\Models\Device;
use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index()
    {
        $devices = Device::all();

        return Inertia::render('Position/Index', [
            'positions' => new PositionCollection($devices)
        ]);
    }

    public function store(Request $request)
    {
        $device = Device::where('device_id', $request->device_id)->first();

        if ($device) {
            try {
                DB::beginTransaction();

                $position = Position::create($request->all());

                $device->update([
                    'position_id' => $position->id,
                    'last_update' => round(microtime(true) * 1000)
                ]);

                DB::commit();

                // broadcast(new DeviceUpdate);

                return response()->json([
                    'success' => true,
                    'data' => $device,
                    'message' => 'Position added successfully'
                ]);
            } catch (\Exception $err) {
                DB::rollBack();

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
