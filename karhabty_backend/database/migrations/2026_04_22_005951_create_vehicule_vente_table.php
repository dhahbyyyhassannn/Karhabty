<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicule_vente', function (Blueprint $table) {
            $table->string('matricule')->primary();
            $table->string('marque');
            $table->string('modele');
            $table->string('couleur');
            $table->string('type');
            $table->integer('annee');
            $table->string('carburant');
            $table->integer('nb_places');
            $table->integer('nb_portes');
            $table->integer('nb_cylindres');
            $table->integer('kilometrage');
            $table->text('description');
            $table->string('image');
            $table->float('prix_vente', 6);
            $table->boolean('negociable')->default(false);
            $table->boolean('disponible')->default('true');
            $table->string('user_id');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicule_vente');
    }
};
