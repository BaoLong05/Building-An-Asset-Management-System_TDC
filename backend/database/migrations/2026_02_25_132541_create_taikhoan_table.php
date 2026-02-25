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
        Schema::create('taikhoan', function (Blueprint $table) {
            $table->id('MaTaiKhoan');
            $table->string('TenDangNhap')->unique();
            $table->string('MatKhau');
            $table->string('HoTen')->nullable();
            $table->string('Email')->nullable();

            $table->unsignedBigInteger('MaVaiTro');

            $table->foreign('MaVaiTro')
                ->references('MaVaiTro')
                ->on('vaitro')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->string('TrangThai')->default('HoatDong');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taikhoan');
    }
};
