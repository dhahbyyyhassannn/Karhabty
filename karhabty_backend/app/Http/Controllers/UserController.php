<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function addUser(Request $request)
    {

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'role' => 'nullable|integer',
        ]);
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $role = $request->integer('role', 0);

        $user = new User();
        $user->id = (string) Str::uuid();
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->role = $role;
        $user->save();
        return response()->json([
            'message' => 'user created successfully',
            'user' => $user,
        ]);
    }

    public function logIn(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'user logged in successfully',
            'token' => $token,
            'user' => $user,
        ]);
    }
}
