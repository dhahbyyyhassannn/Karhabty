<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Societe extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'societes';

    protected $fillable = [
        'name',
        'type',
        'email',
        'password',
        'phone',
        'address',
        'is_suspended',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_suspended' => 'boolean',
    ];

    public function vehiculesVente()
    {
        return $this->hasMany(VehiculeVente::class, 'societe_id');
    }

    public function vehiculesLocation()
    {
        return $this->hasMany(VehiculeLocation::class, 'societe_id');
    }
}
