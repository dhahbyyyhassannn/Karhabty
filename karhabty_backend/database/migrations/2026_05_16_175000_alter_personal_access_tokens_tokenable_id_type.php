<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE personal_access_tokens ALTER COLUMN tokenable_id TYPE varchar USING tokenable_id::varchar');
        } else {
            Schema::table('personal_access_tokens', function (Blueprint $table) {
                $table->string('tokenable_id')->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE personal_access_tokens ALTER COLUMN tokenable_id TYPE bigint USING tokenable_id::bigint');
        } else {
            Schema::table('personal_access_tokens', function (Blueprint $table) {
                $table->unsignedBigInteger('tokenable_id')->change();
            });
        }
    }
};
