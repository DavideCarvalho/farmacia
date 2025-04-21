<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Enums\UnitOfMeasurement;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('inventory_items', function (Blueprint $table) {
            $table->string('unit_of_measurement')->nullable()->after('status');
            $table->decimal('quantity_per_unit', 10, 2)->nullable()->after('unit_of_measurement');
        });

        // Atualizar os registros existentes para usar a unidade padrão
        DB::table('inventory_items')
            ->whereNull('unit_of_measurement')
            ->update(['unit_of_measurement' => UnitOfMeasurement::UN->value]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventory_items', function (Blueprint $table) {
            $table->dropColumn(['unit_of_measurement', 'quantity_per_unit']);
        });
    }
};
