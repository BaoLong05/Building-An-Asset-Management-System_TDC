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
        Schema::create('taisan', function (Blueprint $table) {

            $table->engine = 'InnoDB';

            $table->bigIncrements('MaTaiSan');
            $table->string('TenTaiSan');

            $table->unsignedBigInteger('MaDanhMuc')->nullable();
            $table->unsignedBigInteger('MaPhong')->nullable();

            $table->integer('SoLuong')->default(1);
            $table->decimal('DonGia', 18, 2)->nullable();
            $table->date('NgayNhap')->nullable();
            $table->string('TinhTrang')->default('Tot');
            $table->string('GhiChu')->nullable();

            // Ai tạo / cập nhật / xóa
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();

            // Ngày tạo / cập nhật
            $table->timestamps();

            // Ngày xóa (soft delete)
            $table->softDeletes();

            // FK DanhMuc
            $table->foreign('MaDanhMuc')
                ->references('MaDanhMuc')
                ->on('danhmuc')
                ->onDelete('set null')
                ->onUpdate('cascade');

            // FK Phong
            $table->foreign('MaPhong')
                ->references('MaPhong')
                ->on('phong')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taisan');
    }
};