<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeviceRequest;
use App\Models\Device;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class DeviceContnoller extends Controller
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
        $validation = $request->validated();
        $validation['status'] = 'offline';
        $validation['created_by'] = 1;

        DB::beginTransaction();

        Device::create($validation);

        DB::commit();

        return Redirect::route('devices.index');
    }

    public function edit(Device $device)
    {
        return response()->json($device);
    }

    public function update(DeviceRequest $request, Device $device)
    {
        DB::beginTransaction();

        $device->update($request->all());

        DB::commit();

        return Redirect::route('devices.index');
    }

    public function destroy(Device $device)
    {
        DB::beginTransaction();

        $device->delete();

        DB::commit();

        return Redirect::route('devices.index');
    }
}
