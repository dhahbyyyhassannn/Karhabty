<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SocietesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('societes')->insert([
            [
                'name'         => 'AutoVente Plus',
                'type'         => 'sale',
                'email'        => 'autoventeplus@gmail.com',
                'password'     => Hash::make('password1'),
                'phone'        => '+21620000001',
                'address'      => '12 Rue de la République, Tunis',
                'is_suspended' => false,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'name'         => 'Location Express',
                'type'         => 'rent',
                'email'        => 'locationexpress@gmail.com',
                'password'     => Hash::make('password12'),
                'phone'        => '+21620000002',
                'address'      => '45 Avenue Habib Bourguiba, Sfax',
                'is_suspended' => false,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'name'         => 'CarDeal Pro',
                'type'         => 'sale',
                'email'        => 'cardealpro@gmail.com',
                'password'     => Hash::make('password123'),
                'phone'        => '+21620000003',
                'address'      => '8 Rue Ibn Khaldoun, Sousse',
                'is_suspended' => false,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'name'         => 'RentWheels',
                'type'         => 'rent',
                'email'        => 'rentwheels@gmail.com',
                'password'     => Hash::make('password1234'),
                'phone'        => null,
                'address'      => null,
                'is_suspended' => true,  // suspended example
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
        ]);
    }
}