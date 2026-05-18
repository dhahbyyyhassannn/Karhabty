<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VehiculeLocation;
use App\Models\VehiculeVente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VehiculeVenteController extends Controller
{
    public function addVehicule(Request $request)
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
            'societe_id' => 'sometimes|nullable|integer|exists:societes,id',
        ]);
        $VehiculeVente = new VehiculeVente();
        $VehiculeVente->matricule = $request->matricule;
        $VehiculeVente->marque = $request->marque;
        $VehiculeVente->modele = $request->modele;
        $VehiculeVente->couleur = $request->couleur;
        $VehiculeVente->type = $request->type;
        $VehiculeVente->annee = $request->annee;
        $VehiculeVente->carburant = $request->carburant;
        $VehiculeVente->nb_places = $request->nb_places;
        $VehiculeVente->nb_portes = $request->nb_portes;
        $VehiculeVente->nb_cylindres = $request->nb_cylindres;
        $VehiculeVente->kilometrage = $request->kilometrage;
        $VehiculeVente->description = $request->description;
        $VehiculeVente->image = $request->image;
        $VehiculeVente->prix_vente = $request->prix_vente;
        $VehiculeVente->negociable = $request->negociable;
        $VehiculeVente->societe_id = $request->input('societe_id');
        $VehiculeVente->id = Auth::id();
        $VehiculeVente->save();
        return response()->json([
            'message' => 'Vehicule sale listing created successfully',
        ], 201);
    }

    public function allVehiculesVente() {
        $allVehicules = VehiculeVente::all();
        return response()->json($allVehicules);
    }
}
