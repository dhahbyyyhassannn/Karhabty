<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vente extends Model
{
    protected $table = 'vente';
    protected $fillable = [
        'id',
        'matricule',
        'date_vente',
        'prix_vente',
    ];
    public function user() {
        return $this->belongsTo(User::class, 'id');
    }
    public function vehicule_vente() {
        return $this->belongsTo(VehiculeVente::class, 'matricule', 'matricule');
    }
}
