<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehiculeVente extends Vehicule
{
    public function vehicule() {
        return $this->belongsTo(Vehicule::class);
    }
    public function vente() {
        return $this->hasMany(Vente::class);
    }
}
