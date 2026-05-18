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
        Schema::create('vente', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('matricule')->unique();
            $table->primary(['user_id', 'matricule']);
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('matricule')->references('matricule')->on('vehicule_vente')->onDelete('cascade');
            $table->date('date_vente');
            $table->float('prix_vente', 6);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vente');
    }
};
