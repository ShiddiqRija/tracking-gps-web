<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Device;
use App\Models\Message;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
// use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Message/Index', [
            'devices' => Device::all(),
            'messages' => Message::query()
                ->filter(Request::only('search'))
                ->paginate(10)
        ]);
    }

    public function store(MessageRequest $request)
    {
        try {
            $validation = $request->validated();
            $validation['unique_id']    = Device::where('device_id', $validation['device_id'])->first()->unique_id;
            $validation['send_time']    = round(microtime(true) * 1000);
            $validation['created_by']   = auth()->user()->id;

            $sendMessage = $this->send($validation);
            $status = json_decode($sendMessage->getStatusCode());

            if ($status == 200 || $status == 202) {
                DB::beginTransaction();

                $message = Message::create($validation);

                DB::commit();

                Log::info(
                    '[OK] Send Message',
                    ['user' => [
                        'id' => auth()->user()->id,
                        'name' => auth()->user()->name
                    ], 'data' => $message]
                );

                return Redirect::route('messages.index');
            }
        } catch (\Exception $err) {
            DB::rollBack();

            Log::error(
                '[FAILED] Send Message',
                ['user' => [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name
                ], 'error' => $err->getMessage()]
            );

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }

    public function send($data)
    {
        $client = new Client();

        $res = $client->request('POST', env('GPS_SERVER') . '/api/commands/send', [
            'auth' => [
                env('GPS_USER_EMAIL'), env('GPS_USER_PASSWORD')
            ],
            'headers' => [
                'Content-Type'  => 'application/json'
            ],
            'body' => json_encode([
                'deviceId'      => $data['device_id'],
                'description'   => 'Message from Tracking App Client',
                'type'          => 'custom',
                'attributes'    => [
                    'data'  => 'mg=' . $data["message"]
                ]
            ])
        ]);

        return $res;
    }
}
