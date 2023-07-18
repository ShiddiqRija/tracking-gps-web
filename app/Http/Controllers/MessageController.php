<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Device;
use App\Models\Message;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;
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
        
                Message::create($validation);
        
                DB::commit();
        
                return Redirect::route('messages.index');
            }
        } catch (\Exception $err) {
            DB::rollBack();

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
