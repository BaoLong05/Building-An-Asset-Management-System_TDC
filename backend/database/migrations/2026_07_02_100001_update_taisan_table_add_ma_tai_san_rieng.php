<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('taisan', function (Blueprint $table) {
            $table->dropColumn('SoLuong');
            $table->string('MaTaiSanRieng', 100)->unique()->after('MaTaiSan');
        });
    }

    public function down(): void
    {
        Schema::table('taisan', function (Blueprint $table) {
            $table->integer('SoLuong')->default(1);
            $table->dropColumn('MaTaiSanRieng');
        });
    }
};
