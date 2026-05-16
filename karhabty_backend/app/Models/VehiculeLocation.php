<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehiculeLocation extends Model
{
    public function vehicule() {
        return $this->belongsTo(Vehicule::class);
    }
    public function reservation() {
        return $this->hasMany(Reservation::class);
    }
}
