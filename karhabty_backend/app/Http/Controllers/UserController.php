<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function addUser(Request $request) {

        $request->validate([
            'id' => 'required',
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'required',
        ]);
        $id = $request->id;
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $role = $request->role;

        $user = new User();
        $user->id = $id;
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->role = $role;
        $user->save();
        return response()->json([
            'message' => 'user created successfully'
        ]);
    }

    public function logIn(Request $request) {
        $credentials = $request->only('email', 'password');

        if(!$token = auth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        return response()->json(
            [
                'token' => $token,
            ]
        );
    }
}
