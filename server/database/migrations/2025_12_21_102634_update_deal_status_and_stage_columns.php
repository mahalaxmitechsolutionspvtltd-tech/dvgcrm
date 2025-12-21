<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('deals', function (Blueprint $table) {
            // Old-school ENUM for deal_stage
            $table->enum('deal_stage', [
                'Discovery',
                'Qualification',
                'Proposal',
                'Negotiation',
                'Closed Won',
                'Closed Lost'
            ])->default('Discovery')->change();

            // Old-school ENUM for status
            $table->enum('status', [
                'New',
                'Repeat',
                'In Progress',
                'Won',
                'Lost',
                'On Hold',
                'Cancelled'
            ])->default('New')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deals', function (Blueprint $table) {
            // If rolling back, you can set them back to string
            $table->string('deal_stage')->change();
            $table->string('status')->change();
        });
    }
};
