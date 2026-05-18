<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehiculeLocationSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('vehicule_location')->insert([
            [
                'matricule'     => '100TU1234',
                'marque'        => 'Renault',
                'modele'        => 'Clio',
                'couleur'       => 'Rouge',
                'type'          => 'Citadine',
                'annee'         => 2020,
                'carburant'     => 'Essence',
                'nb_places'     => 5,
                'nb_portes'     => 4,
                'nb_cylindres'  => 4,
                'kilometrage'   => 30000,
                'description'   => 'Voiture en bon état, climatisée.',
                'image'         => 'clio.jpg',
                'prix_par_jour' => 80.00,
                'caution'       => 500.00,
                'disponibilite' => 'disponible',
                'societe_id'    => 2,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'matricule'     => '200TU5678',
                'marque'        => 'Peugeot',
                'modele'        => '208',
                'couleur'       => 'Blanc',
                'type'          => 'Citadine',
                'annee'         => 2021,
                'carburant'     => 'Diesel',
                'nb_places'     => 5,
                'nb_portes'     => 4,
                'nb_cylindres'  => 4,
                'kilometrage'   => 15000,
                'description'   => 'Très bon état, faible kilométrage.',
                'image'         => 'peugeot208.jpg',
                'prix_par_jour' => 90.00,
                'caution'       => 600.00,
                'disponibilite' => 'indisponible',
                'societe_id'    => 2,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ]);
    }
}