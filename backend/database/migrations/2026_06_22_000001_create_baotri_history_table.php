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
        Schema::create('baotri_history', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->bigIncrements('MaLichSuBaoTri');
            $table->unsignedBigInteger('MaBaoTri')->nullable();
            $table->unsignedBigInteger('MaTaiSan');

            $table->text('NoiDung')->nullable();
            $table->dateTime('NgayBaoTri')->nullable();
            $table->enum('TinhTrang', ['Đang bảo trì', 'Hoàn thành'])->default('Đang bảo trì');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('assigned_to')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();

            $table->timestamps();

            $table->foreign('MaBaoTri')
                ->references('MaBaoTri')
                ->on('baotri')
                ->onDelete('set null');

            $table->foreign('MaTaiSan')
                ->references('MaTaiSan')
                ->on('taisan')
                ->onDelete('cascade');

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('assigned_to')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('updated_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('baotri_history');
    }
};
