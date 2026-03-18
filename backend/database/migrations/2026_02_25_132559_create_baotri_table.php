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
        Schema::create('baotri', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->bigIncrements('MaBaoTri');
            $table->unsignedBigInteger('MaTaiSan');

            $table->text('NoiDung')->nullable();
            $table->dateTime('NgayBaoTri')->nullable();

            $table->string('TrangThai')->default('Đang Xử Lý'); 
            // Đang Xử Lý | Hoàn Thành
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('MaTaiSan')
                ->references('MaTaiSan')
                ->on('taisan')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('baotri');
    }
};
