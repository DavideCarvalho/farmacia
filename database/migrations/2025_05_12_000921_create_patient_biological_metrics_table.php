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
        Schema::create('patient_biological_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_observation_id')->constrained()->onDelete('cascade');
            $table->string('metric_type');
            $table->decimal('value', 8, 2);
            $table->string('unit');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_biological_metrics');
    }
};
