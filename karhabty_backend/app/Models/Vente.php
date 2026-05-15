<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vente extends Model
{
    public function utilisateur() {
        return $this->belongsTo(User::class);
    }
    public function vehicule_vente() {
        return $this->belongsTo(Vehicule_vente::class);
    }
}
