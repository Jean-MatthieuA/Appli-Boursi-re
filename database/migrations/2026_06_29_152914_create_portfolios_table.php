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
    Schema::create('portfolios', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('name');
        $table->timestamps();
    });

    Schema::table('stocks', function (Blueprint $table) {
        $table->foreignId('portfolio_id')->nullable()->constrained()->onDelete('cascade');
    });
}

public function down(): void
{
    Schema::table('stocks', function (Blueprint $table) {
        $table->dropForeign(['portfolio_id']);
        $table->dropColumn('portfolio_id');
    });

    Schema::dropIfExists('portfolios');
}
};
