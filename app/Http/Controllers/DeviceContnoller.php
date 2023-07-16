<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeviceRequest;
use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DeviceContnoller extends Controller
{
    public function index()
    {
        $devices = Device::query()
            ->paginate(10);

        return Inertia::render('Device/Index', ['devices' => $devices]);
    }

    public function store(DeviceRequest $request)
    {
        $validation = $request->validated();
        $validation['status'] = 'offline';
        $validation['created_by'] = 1;

        DB::beginTransaction();

        Device::create($validation);

        DB::commit();

        return Redirect::route('devices');
    }

    public function edit(Device $device)
    {
        return response()->json($device);
    }

    public function update(Request $request, Device $device)
    {
        DB::beginTransaction();

        $device->update($request->all());

        DB::commit();

        return Redirect::route('devices');
    }
}
