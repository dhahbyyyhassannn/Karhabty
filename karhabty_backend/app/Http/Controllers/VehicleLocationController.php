<?php
namespace App\Http\Controllers;

use App\Models\VehiculeLocation;

    class VehicleLocationController extends Controller {
        public function addVehicleLocation(Request $request) {
            $validated = $request->validate([
                'matricule' => 'required',
                'marque' => 'required',
                'modele' => 'required',
                'couleur' => 'required',
                'type' => 'required',
                'annee' => 'required',
                'carburant' => 'required',
                'kilometrage' => 'required',
                'description' => 'required',
                'image' => 'required',
                'prix_par_jour' => 'required',
                'caution' => 'required',
                'disponibilite' => 'required'
            ]);
            $vehicleLocation = new VehiculeLocation();
            $vehicleLocation->matricule = $request->matricule;
            $vehicleLocation->marque = $request->marque;
            $vehicleLocation->modele  = $request->modele;
            $vehicleLocation->couleur  = $request->couleur;
            $vehicleLocation->type  = $request->type;
            $vehicleLocation->annee = $request->annee;
            $vehicleLocation->carburant  = $request->carburant;
            $vehicleLocation->kilometrage = $request->kilometrage;
            $vehicleLocation->description = $request->description;
            $vehicleLocation->image = $request->image;
            $vehicleLocation->prix_par_jour  = $request->prix_par_jour;
            $vehicleLocation->caution  = $request->caution;
            $vehicleLocation->disponibilite  = $request->disponibilite;
            $vehicleLocation->id=Auth::id();
            $vehicleLocation->save();
            return response()->json([
                'message' => 'vehicle location added successfully',
                201]);
        }
}
