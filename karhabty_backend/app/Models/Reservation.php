<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    public function utilisateur() {
        return $this->belongsTo(User::class, 'id');
    }
    public function vehicule_location() {
        return $this->belongsTo(Vehicule_location::class, 'matricule');
    }
}
