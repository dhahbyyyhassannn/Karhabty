<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VehicleListingController extends Controller
{
    public function storeSale(Request $request)
    {
        $validated = $request->validate([
            'matricule' => 'required|string|max:255|unique:vehicule_vente,matricule',
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
            'prix_vente' => 'required|numeric|min:0',
            'negociable' => 'sometimes|boolean',
        ]);

        $user = Auth::user();

        DB::table('vehicule_vente')->insert([
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
            'disponibilite' => 'disponible',
            'id' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Vehicle sale listing created successfully',
        ], 201);
    }

    public function storeRental(Request $request)
    {
        $validated = $request->validate([
            'matricule' => 'required|string|max:255|unique:vehicule_location,matricule',
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
            'prix_par_jour' => 'required|numeric|min:0',
            'caution' => 'required|numeric|min:0',
        ]);

        $user = Auth::user();

        DB::table('vehicule_location')->insert([
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
            'id' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Vehicle rental listing created successfully',
        ], 201);
    }
}
