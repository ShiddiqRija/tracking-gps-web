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
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('device_id')->default(0);
            $table->integer('group_id')->default(0);
            $table->string('name');
            $table->string('unique_id');
            $table->string('status');
            $table->bigInteger('last_update')->default(0);
            $table->bigInteger('position_id')->default(0);
            $table->string('phone')->nullable();
            $table->string('contact')->nullable();
            $table->integer('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
