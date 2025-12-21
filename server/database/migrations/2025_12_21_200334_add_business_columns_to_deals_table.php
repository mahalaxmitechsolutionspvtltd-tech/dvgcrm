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
            $table->string('company_type')->nullable()->after('company_name');
            $table->string('nature_of_business')->nullable()->after('company_type');
            $table->string('contact_number')->nullable()->after('contact_name');
            $table->string('pan_number')->nullable()->after('city');
            $table->string('gst_no')->nullable()->after('pan_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deals', function (Blueprint $table) {
            //
        });
    }
};
