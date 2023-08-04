<?php

namespace App\Http\Controllers;

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
        ]);
    }

    public function store(Request $request)
    {
        $positionHistory = Position::where('device_id', $request->device_id)
            ->whereBetween('device_time', [$request->from, $request->to])
            ->get();

        return response()->json($positionHistory);
    }
}
