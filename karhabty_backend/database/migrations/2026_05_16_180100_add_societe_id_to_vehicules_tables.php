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
        Schema::table('vehicule_vente', function (Blueprint $table) {
            $table->unsignedBigInteger('societe_id')->nullable()->after('user_id');
            $table->foreign('societe_id')->references('id')->on('societes')->onDelete('set null');
        });

        Schema::table('vehicule_location', function (Blueprint $table) {
            $table->unsignedBigInteger('societe_id')->nullable()->after('user_id');
            $table->foreign('societe_id')->references('id')->on('societes')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicule_vente', function (Blueprint $table) {
            $table->dropForeign(['societe_id']);
            $table->dropColumn('societe_id');
        });

        Schema::table('vehicule_location', function (Blueprint $table) {
            $table->dropForeign(['societe_id']);
            $table->dropColumn('societe_id');
        });
    }
};
