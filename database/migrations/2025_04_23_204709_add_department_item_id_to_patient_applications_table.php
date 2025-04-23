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
        Schema::table('patient_applications', function (Blueprint $table) {
            $table->foreignId('department_item_id')
                ->nullable()
                ->constrained('department_items')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patient_applications', function (Blueprint $table) {
            $table->dropForeign(['department_item_id']);
            $table->dropColumn('department_item_id');
        });
    }
};
