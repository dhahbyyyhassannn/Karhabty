<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class vehiculeModel extends Model
{
    protected $fillable = [
        'matricule',
        'marque',
        'modele',
        'couleur',
        'type',
        'annee',
        'carburant',
        'nb_places',
        'nb_cylindre',
        'kilometrage',
        'description'
    ];
}
