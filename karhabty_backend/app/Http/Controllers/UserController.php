<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function addUser(Request $request)
    {

        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
    
        $user = new User();
        $user->user_id = (string) Str::uuid();
        $user->name = $name;
        $user->email = $email;
        $user->password = $password;
        $user->role = 0;
        $user->save();
        return response()->json([
            'message' => 'user created successfully',
            'user' => $user,
        ],201);
    }
    public function logIn(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || $user->is_suspended || !Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'user logged in successfully',
                'token' => $token,
                'user' => $user,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'line'  => $e->getLine(),
                'file'  => $e->getFile(),
            ], 500);
        }
    }
    }
