<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehiculeVenteSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('vehicule_vente')->insert([
            [
                'matricule'    => '300TU9999',
                'marque'       => 'Toyota',
                'modele'       => 'Yaris',
                'couleur'      => 'Gris',
                'type'         => 'Citadine',
                'annee'        => 2019,
                'carburant'    => 'Essence',
                'nb_places'    => 5,
                'nb_portes'    => 4,
                'nb_cylindres' => 4,
                'kilometrage'  => 60000,
                'description'  => 'Voiture bien entretenue, prête à vendre.',
                'image'        => 'yaris.jpg',
                'prix_vente'   => 18000.00,
                'negociable'   => true,
                'disponible'   => true,
                'user_id'      => '1',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'matricule'    => '400TU1111',
                'marque'       => 'Volkswagen',
                'modele'       => 'Golf',
                'couleur'      => 'Noir',
                'type'         => 'Compacte',
                'annee'        => 2018,
                'carburant'    => 'Diesel',
                'nb_places'    => 5,
                'nb_portes'    => 4,
                'nb_cylindres' => 4,
                'kilometrage'  => 90000,
                'description'  => 'Diesel économique, bon état général.',
                'image'        => 'golf.jpg',
                'prix_vente'   => 22000.00,
                'negociable'   => false,
                'disponible'   => true,
                'user_id'      => '1',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
        ]);
    }
}