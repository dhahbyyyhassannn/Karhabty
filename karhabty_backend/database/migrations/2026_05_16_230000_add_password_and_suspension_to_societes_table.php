<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('societes', function (Blueprint $table) {
            if (!Schema::hasColumn('societes', 'password')) {
                $table->string('password')->nullable()->after('email');
            }

            if (!Schema::hasColumn('societes', 'is_suspended')) {
                $table->boolean('is_suspended')->default(false)->after('address');
            }
        });
    }

    public function down(): void
    {
        Schema::table('societes', function (Blueprint $table) {
            if (Schema::hasColumn('societes', 'password')) {
                $table->dropColumn('password');
            }

            if (Schema::hasColumn('societes', 'is_suspended')) {
                $table->dropColumn('is_suspended');
            }
        });
    }
};
