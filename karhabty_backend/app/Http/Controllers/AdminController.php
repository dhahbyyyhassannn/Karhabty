<?php

namespace App\Http\Controllers;

use App\Models\Societe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = User::where('email', $request->email)->where('role', 2)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $token = $admin->createToken('admin_token')->plainTextToken;

        return response()->json([
            'message' => 'Admin logged in successfully',
            'token' => $token,
            'admin' => $admin,
        ], 200);
    }

    protected function ensureAdmin(Request $request)
    {
        $user = $request->user();
        if (!$user || $user->role !== 2) {
            abort(403, 'Unauthorized');
        }
        return $user;
    }

    public function users(Request $request)
    {
        $this->ensureAdmin($request);
        return response()->json(User::all());
    }

    public function societes(Request $request)
    {
        $this->ensureAdmin($request);
        return response()->json(Societe::all());
    }

    public function suspendUser(Request $request, $userId)
    {
        $this->ensureAdmin($request);
        $user = User::findOrFail($userId);
        $user->is_suspended = !$user->is_suspended;
        $user->save();

        return response()->json(['message' => 'User suspension toggled', 'is_suspended' => $user->is_suspended]);
    }

    public function deleteUser(Request $request, $userId)
    {
        $this->ensureAdmin($request);
        $user = User::findOrFail($userId);
        $user->delete();

        return response()->json(['message' => 'User deleted']);
    }

    public function suspendSociete(Request $request, $societeId)
    {
        $this->ensureAdmin($request);
        $societe = Societe::findOrFail($societeId);
        $societe->is_suspended = !$societe->is_suspended;
        $societe->save();

        return response()->json(['message' => 'Societe suspension toggled', 'is_suspended' => $societe->is_suspended]);
    }

    public function deleteSociete(Request $request, $societeId)
    {
        $this->ensureAdmin($request);
        $societe = Societe::findOrFail($societeId);
        $societe->delete();

        return response()->json(['message' => 'Societe deleted']);
    }
}
