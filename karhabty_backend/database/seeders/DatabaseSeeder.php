<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\SocietesSeeder;
use Database\Seeders\VehiculeVenteSeeder;
use Database\Seeders\VehiculeLocationSeeder;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            SocietesSeeder::class,
            VehiculeVenteSeeder::class,
            VehiculeLocationSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 0,
            'is_suspended' => false,
        ]);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 2,
            'is_suspended' => false,
        ]);
    }
}
