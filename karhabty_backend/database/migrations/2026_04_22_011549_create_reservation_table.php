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
            $table->id();
            $table->string('user_id');
            $table->string('matricule');
            $table->primary(['user_id', 'matricule']);
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
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
