<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\WifiRequest;
use App\Models\Wifi;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class WifiController extends Controller
{
    public function index()
    {
        return Inertia::render('Setting/Wifi/Index', [
            'wifis' => Wifi::query()
                ->filter(Request::only('search'))
                ->paginate(10)
        ]);
    }

    public function store(WifiRequest $request)
    {
        try {
            $validation = $request->validated();

            DB::beginTransaction();

            $wifi = Wifi::create($validation);

            DB::commit();

            Log::info(
                '[OK] Add Wifi/Location',
                ['user' => [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name
                ], 'data' => $wifi]
            );

            return Redirect::route('wifi.index');
        } catch (\Exception $err) {
            DB::rollBack();

            Log::error(
                '[FAILED] Add Wifi/Location',
                ['user' => [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name
                ], 'error' => $err->getMessage()]
            );

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }

    public function edit(Wifi $wifi)
    {
        return response()->json($wifi);
    }

    public function update(HttpRequest $request, Wifi $wifi)
    {
        try {
            DB::beginTransaction();

            $wifi->update($request->all());

            DB::commit();

            Log::info(
                '[OK] Edit Wifi/Location',
                ['user' => [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name
                ], 'data' => $wifi]
            );

            return Redirect::route('wifi.index');
        } catch (\Exception $err) {
            DB::rollBack();

            Log::error(
                '[FAILED] Edit Wifi/Location',
                ['user' => [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name
                ], 'error' => $err->getMessage()]
            );

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }

    public function destroy(Wifi $wifi)
    {
        try {
            DB::beginTransaction();

            $wifi->delete();

            DB::commit();

            Log::info(
                '[OK] Delete Wifi/Location',
                ['user' => [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name
                ], 'data' => $wifi]
            );

            return Redirect::route('wifi.index');
        } catch (\Exception $err) {
            DB::rollBack();

            Log::error(
                '[FAILED] Delete Wifi/Location',
                ['user' => [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name
                ], 'error' => $err->getMessage()]
            );

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }
}
