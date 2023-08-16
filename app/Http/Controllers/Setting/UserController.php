<?php

namespace App\Http\Controllers\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Setting/User/Index', [
            'users' => User::query()
                ->filter(FacadesRequest::only('search'))
                ->paginate(10)
        ]);
    }

    public function store(UserRequest $request)
    {
        try {
            $validation = $request->validated();

            DB::beginTransaction();

            User::create($validation);

            DB::commit();

            return Redirect::route('user.index');
        } catch (\Exception $err) {
            DB::rollBack();

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }

    public function edit(User $user)
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        try {
            DB::beginTransaction();

            if ($request->password != null) {
                $user->update($request->all());
            } else {
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email
                ]);
            }

            DB::commit();

            return Redirect::route('user.index');
        } catch (\Exception $err) {
            DB::rollBack();

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }

    public function destroy(User $user)
    {
        try {
            DB::beginTransaction();

            $user->delete();

            DB::commit();

            return Redirect::route('user.index');
        } catch (\Exception $err) {
            DB::rollBack();

            return Redirect::back()->withErrors(['error' => $err->getMessage()]);
        }
    }
}
