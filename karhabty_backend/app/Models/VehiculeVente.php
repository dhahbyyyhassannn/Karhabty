<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehiculeVente extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'vehicule_vente';
    protected $primaryKey = 'matricule';

    protected $fillable = ['matricule', 'disponible', 'user_id', 'societe_id', 'marque', 'modele', 'couleur', 'type', 'annee', 'carburant', 'nb_places', 'nb_portes', 'nb_cylindres', 'kilometrage', 'description', 'image', 'prix_vente', 'negociable'];

    public function vente() {
        return $this->hasOne(Vente::class, 'matricule', 'matricule');
    }

    public function societe()
    {
        return $this->belongsTo(Societe::class, 'societe_id');
    }
}
