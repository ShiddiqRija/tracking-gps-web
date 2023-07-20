<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeviceRequest;
use App\Models\Device;
use GuzzleHttp\Client;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
    {
        return Inertia::render('Device/Index', [
            // 'filters' => Request::all('search'),
            'devices' => Device::query()
                ->filter(Request::only('search'))
                ->paginate(10)
        ]);
    }

    public function store(DeviceRequest $request)
    {
        try {
            $validation = $request->validated();
            $validation['status'] = 'offline';
            $validation['created_by'] = auth()->user()->id;

            $storeToServer = $this->storeServer($validation);

            $validation['device_id']    = json_decode($storeToServer->getBody()->getContents())->id;
            $status                     = json_decode($storeToServer->getStatusCode());
            
            if ($status == 200) {
                DB::beginTransaction();
        
                Device::create($validation);
        
                DB::commit();
            }

            return Redirect::route('devices.index');
        } catch (\Exception $err) {
            DB::rollBack();

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }


    }

    public function edit(Device $device)
    {
        return response()->json($device);
    }

    public function update(HttpRequest $request, Device $device)
    {
        try {
            $updateToServer = $this->updateServer($request, $device);
            $status = json_decode($updateToServer->getStatusCode());

            if ($status == 200) {
                DB::beginTransaction();
        
                $device->update($request->all());
        
                DB::commit();
        
                return Redirect::route('devices.index');
            }
        } catch (\Exception $err) {
            DB::rollBack();

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }

    public function destroy(Device $device)
    {
        try {
            $deleteFromServer = $this->destroyServer($device->device_id);
            $status = json_decode($deleteFromServer->getStatusCode());

            if ($status == 204) {
                DB::beginTransaction();
        
                $device->delete();
        
                DB::commit();
                
                return Redirect::route('devices.index');
            }
        } catch (\Exception $err) {
            DB::rollBack();

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }

    }

    public function status(HttpRequest $request)
    {
        $device = Device::where('device_id', $request->id)->first();

        try {
            DB::beginTransaction();

            $device->update([
                'status' => $request->status,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $device,
                'message' => 'Device status updated successfully'
            ]);
        } catch (\Exception $err) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'data' => $err->getMessage(),
                'message' => 'Failed to update device status'
            ]);
        }
    }

    public function storeServer($data)
    {
        $client = new Client();

        $res = $client->request('POST', env('GPS_SERVER') . '/api/devices', [
            'auth' => [
                env('GPS_USER_EMAIL'), env('GPS_USER_PASSWORD')
            ],
            'headers' => [
                'Content-Type'  => 'application/json'
            ],
            'body' => json_encode([
                'name'      => $data['name'],
                'uniqueId'  => $data['unique_id'],
                'status'    => $data['status'],
                'groupId'   => $data['group_id'],
                'phone'     => $data['phone'],
                'contact'   => $data['contact'],
            ])
        ]);

        return $res;
    }

    public function updateServer($request, $device)
    {
        $client = new Client();

        $res = $client->request('PUT', env('GPS_SERVER') . "/api/devices/$device->device_id", [
            'auth' => [
                env('GPS_USER_EMAIL'), env('GPS_USER_PASSWORD')
            ],
            'headers' => [
                'Content-Type'  => 'application/json'
            ],
            'body' => json_encode([
                'id'        => $device->device_id,
                'name'      => $request->name,
                'uniqueId'  => $request->unique_id,
                'groupId'   => $request->group_id,
                'phone'     => $request->phone,
                'contact'   => $request->contact,
            ])
        ]);

        return $res;
    }

    public function destroyServer($id)
    {
        $client = new Client();

        $res = $client->request('DELETE', env('GPS_SERVER') . "/api/devices/$id", [
            'auth' => [
                env('GPS_USER_EMAIL'), env('GPS_USER_PASSWORD')
            ]
        ]);

        return $res;
    }
}
