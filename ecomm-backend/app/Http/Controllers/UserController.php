<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function register(Request $request){

        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return $user;
    }

    function login(Request $request) {
        $user = User::where('email', $request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'error' => ['Email or password is not matched']
            ]);
        }

        return $user;
    }

    function profile($id){
        return User::where('id', $id)->first();
    }
}
