<?php

namespace App\Http\Controllers;

use App\Events\DeviceNotificationEvent;
use App\Http\Resources\EventResource;
use App\Models\Device;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $device = Device::where('device_id', $request->device_id);

        if ($device) {
            try {
                DB::beginTransaction();

                $event = Event::create($request->all());

                DB::commit();

                broadcast(new DeviceNotificationEvent(new EventResource($event)));

                return response()->json([
                    'success' => true,
                    'data' => $event,
                    'message' => 'Event added succesfully'
                ]);
            } catch (\Exception $err) {
                DB::rollBack();

                return response()->json([
                    'success' => false,
                    'data' => $err->getMessage(),
                    'message' => 'Failed to add event'
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
