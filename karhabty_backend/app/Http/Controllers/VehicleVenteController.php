<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VehiculeVente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VehicleVenteController extends Controller
{
    public function addVehicle(Request $request)
    {
        $validated = $request->validate([
            'matricule' => 'required',
            'marque' => 'required',
            'modele' => 'required',
            'couleur' => 'required',
            'type' => 'required',
            'annee' => 'required',
            'carburant' => 'required',
            'nb_places' => 'required',
            'nb_portes' => 'required',
            'nb_cylindres' => 'required',
            'kilometrage' => 'required',
            'description' => 'required',
            'image' => 'required',
            'prix_vente' => 'required',
            'negociable' => 'sometimes',
        ]);
        $VehicleVente = new VehiculeVente();
        $VehicleVente->matricule = $request->matricule;
        $VehicleVente->marque = $request->marque;
        $VehicleVente->modele = $request->modele;
        $VehicleVente->couleur = $request->couleur;
        $VehicleVente->type = $request->type;
        $VehicleVente->annee = $request->annee;
        $VehicleVente->carburant = $request->carburant;
        $VehicleVente->nb_places = $request->nb_places;
        $VehicleVente->nb_portes = $request->nb_portes;
        $VehicleVente->nb_cylindres = $request->nb_cylindres;
        $VehicleVente->kilometrage = $request->kilometrage;
        $VehicleVente->description = $request->description;
        $VehicleVente->image = $request->image;
        $VehicleVente->prix_vente = $request->prix_vente;
        $VehicleVente->negociable = $request->negociable;
        $VehicleVente->id = Auth::id();
        $VehicleVente->save();
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
