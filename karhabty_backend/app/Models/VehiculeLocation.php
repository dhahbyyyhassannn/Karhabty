<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehiculeLocation extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'vehicule_location';
    protected $primaryKey = 'matricule';
    protected $fillable = ['matricule','marque','modele','couleur','type','annee','carburant','nb_places','nb_portes','nb_cylindres','kilometrage','description','image','prix_par_jour','caution','disponibilite','user_id','societe_id'];

    public function vehicule() {
        return $this->belongsTo(vehiculeModel::class);
    }

    public function reservation() {
        return $this->hasMany(Reservation::class);
    }

    public function societe()
    {
        return $this->belongsTo(Societe::class, 'societe_id');
    }
}
