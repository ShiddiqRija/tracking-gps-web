<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
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
            'messages' => Message::query()
                ->filter(Request::only('search'))
                ->paginate(10)
        ]);
    }

    public function store(MessageRequest $request)
    {
        $validation = $request->validated();
        $validation['created_by'] = auth()->user()->id;

        DB::beginTransaction();

        Message::create($validation);

        DB::commit();

        return Redirect::route('messages.index');
    }
}
