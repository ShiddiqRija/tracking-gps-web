<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReplayCollection;
use App\Models\AppLocation;
use App\Models\Device;
use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReplayController extends Controller
{
    public function index()
    {
        return Inertia::render('Replay/Index', [
            'devices' => Device::all(),
            'periods' => [
                [
                    'type' => 'Today'
                ], [
                    'type' => 'Custom'
                ]
            ],
            'locationInit' => AppLocation::first()
        ]);
    }

    public function store(Request $request)
    {
        $device = Position::with('device')
            ->whereBetween('device_time', [$request->from, $request->to])
            ->where('device_id', $request->device_id)
            ->get();

        return response()->json(new ReplayCollection($device));
    }
}
