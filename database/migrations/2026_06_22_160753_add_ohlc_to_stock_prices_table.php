<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
{
    Schema::table('stock_prices', function (Blueprint $table) {
        $table->decimal('open', 10, 2)->nullable()->after('price');
        $table->decimal('high', 10, 2)->nullable()->after('open');
        $table->decimal('low', 10, 2)->nullable()->after('high');
    });
}

public function down(): void
{
    Schema::table('stock_prices', function (Blueprint $table) {
        $table->dropColumn(['open', 'high', 'low']);
    });
}
};
