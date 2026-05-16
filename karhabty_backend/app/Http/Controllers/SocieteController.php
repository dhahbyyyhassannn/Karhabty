<?php

namespace App\Http\Controllers;

use App\Models\Societe;
use App\Models\VehiculeLocation;
use App\Models\VehiculeVente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SocieteController extends Controller
{
    public function index()
    {
        return response()->json(Societe::where('is_suspended', false)->get());
    }

    public function addSociete(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:sale,rent',
            'email' => 'required|email|unique:societes,email',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['is_suspended'] = false;

        $societe = Societe::create($validated);

        return response()->json($societe, 201);
    }

    public function logInSociete(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $societe = Societe::where('email', $validated['email'])->first();

        if (!$societe || $societe->is_suspended || !Hash::check($validated['password'], $societe->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $token = $societe->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Societe logged in successfully',
            'token' => $token,
            'societe' => $societe,
        ], 200);
    }

    public function vehicles(Societe $societe)
    {
        return response()->json([
            'sales' => VehiculeVente::where('societe_id', $societe->id)->get(),
            'rentals' => VehiculeLocation::where('societe_id', $societe->id)->get(),
        ]);
    }

    public function storeVehicle(Request $request, Societe $societe)
    {
        $validated = $request->validate([
            'vehicle_type' => 'required|in:sale,rent',
            'matricule' => 'required|string|max:255',
            'marque' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'couleur' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'annee' => 'required|integer|min:1900',
            'carburant' => 'required|string|max:255',
            'nb_places' => 'required|integer|min:1',
            'nb_portes' => 'required|integer|min:1',
            'nb_cylindres' => 'required|integer|min:1',
            'kilometrage' => 'required|integer|min:0',
            'description' => 'required|string',
            'image' => 'required|string|max:255',
            'prix_vente' => 'required_if:vehicle_type,sale|numeric',
            'negociable' => 'sometimes|boolean',
            'prix_par_jour' => 'required_if:vehicle_type,rent|numeric',
            'caution' => 'required_if:vehicle_type,rent|numeric',
        ]);

        if ($validated['vehicle_type'] === 'sale') {
            $vehicle = VehiculeVente::create([
                'matricule' => $validated['matricule'],
                'marque' => $validated['marque'],
                'modele' => $validated['modele'],
                'couleur' => $validated['couleur'],
                'type' => $validated['type'],
                'annee' => $validated['annee'],
                'carburant' => $validated['carburant'],
                'nb_places' => $validated['nb_places'],
                'nb_portes' => $validated['nb_portes'],
                'nb_cylindres' => $validated['nb_cylindres'],
                'kilometrage' => $validated['kilometrage'],
                'description' => $validated['description'],
                'image' => $validated['image'],
                'prix_vente' => $validated['prix_vente'],
                'negociable' => $request->boolean('negociable'),
                'societe_id' => $societe->id,
                'disponible' => true,
            ]);
        } else {
            $vehicle = VehiculeLocation::create([
                'matricule' => $validated['matricule'],
                'marque' => $validated['marque'],
                'modele' => $validated['modele'],
                'couleur' => $validated['couleur'],
                'type' => $validated['type'],
                'annee' => $validated['annee'],
                'carburant' => $validated['carburant'],
                'nb_places' => $validated['nb_places'],
                'nb_portes' => $validated['nb_portes'],
                'nb_cylindres' => $validated['nb_cylindres'],
                'kilometrage' => $validated['kilometrage'],
                'description' => $validated['description'],
                'image' => $validated['image'],
                'prix_par_jour' => $validated['prix_par_jour'],
                'caution' => $validated['caution'],
                'disponibilite' => 'disponible',
                'societe_id' => $societe->id,
            ]);
        }

        return response()->json($vehicle, 201);
    }

    public function updateVehicle(Request $request, Societe $societe, $matricule)
    {
        $sale = VehiculeVente::where('societe_id', $societe->id)->where('matricule', $matricule)->first();
        if ($sale) {
            $validated = $request->validate([
                'marque' => 'sometimes|string|max:255',
                'modele' => 'sometimes|string|max:255',
                'couleur' => 'sometimes|string|max:255',
                'type' => 'sometimes|string|max:255',
                'annee' => 'sometimes|integer|min:1900',
                'carburant' => 'sometimes|string|max:255',
                'nb_places' => 'sometimes|integer|min:1',
                'nb_portes' => 'sometimes|integer|min:1',
                'nb_cylindres' => 'sometimes|integer|min:1',
                'kilometrage' => 'sometimes|integer|min:0',
                'description' => 'sometimes|string',
                'image' => 'sometimes|string|max:255',
                'prix_vente' => 'sometimes|numeric',
                'negociable' => 'sometimes|boolean',
            ]);
            $sale->fill($validated);
            $sale->save();
            return response()->json($sale);
        }

        $rental = VehiculeLocation::where('societe_id', $societe->id)->where('matricule', $matricule)->first();
        if ($rental) {
            $validated = $request->validate([
                'marque' => 'sometimes|string|max:255',
                'modele' => 'sometimes|string|max:255',
                'couleur' => 'sometimes|string|max:255',
                'type' => 'sometimes|string|max:255',
                'annee' => 'sometimes|integer|min:1900',
                'carburant' => 'sometimes|string|max:255',
                'nb_places' => 'sometimes|integer|min:1',
                'nb_portes' => 'sometimes|integer|min:1',
                'nb_cylindres' => 'sometimes|integer|min:1',
                'kilometrage' => 'sometimes|integer|min:0',
                'description' => 'sometimes|string',
                'image' => 'sometimes|string|max:255',
                'prix_par_jour' => 'sometimes|numeric',
                'caution' => 'sometimes|numeric',
                'disponibilite' => 'sometimes|string|max:255',
            ]);
            $rental->fill($validated);
            $rental->save();
            return response()->json($rental);
        }

        return response()->json(['error' => 'Vehicle not found'], 404);
    }

    public function deleteVehicle(Societe $societe, $matricule)
    {
        $sale = VehiculeVente::where('societe_id', $societe->id)->where('matricule', $matricule)->first();
        if ($sale) {
            $sale->delete();
            return response()->json(['message' => 'Sale vehicle deleted']);
        }

        $rental = VehiculeLocation::where('societe_id', $societe->id)->where('matricule', $matricule)->first();
        if ($rental) {
            $rental->delete();
            return response()->json(['message' => 'Rental vehicle deleted']);
        }

        return response()->json(['error' => 'Vehicle not found'], 404);
    }
}
