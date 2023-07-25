<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppLocationRequest;
use App\Models\AppLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AppLocationController extends Controller
{
    public function index()
    {
        return Inertia::render('Setting/Server/Edit', [
            'location' => AppLocation::first()
        ]);
    }

    public function update(AppLocationRequest $request, AppLocation $location)
    {
        try {
            $validation = $request->validated();

            DB::beginTransaction();

            $location->update($validation);

            DB::commit();

            return Redirect::route('location.index');
        } catch (\Exception $err) {
            DB::rollBack();

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }
}
