<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{

    protected $table = 'reservation';
    protected $fillable = [
        'id',
        'matricule',
        'date_debut',
        'date_fin',
        'prix_total'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'id', 'id');
    }
    public function vehicule_location() {
        return $this->belongsTo(Vehicule_location::class, 'matricule', 'matricule');
    }
}
