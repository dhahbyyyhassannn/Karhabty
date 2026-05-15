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
        Schema::create('reservation', function (Blueprint $table) {
            $table->string('id');
            $table->string('matricule');
            $table->primary(['id', 'matricule']);
            $table->foreign('id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('matricule')->references('matricule')->on('vehicule_location')->onDelete('cascade');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->float('prix_total', 6);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation');
    }
};
