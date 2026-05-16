<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehiculeVente extends Model
{
    protected $table = 'vehicule_vente';
    protected $primaryKey = 'matricule';

    protected $fillable = ['disponible'];
    public function vente() {
        return $this->hasOne(Vente::class, 'matricule', 'matricule');
    }
}
