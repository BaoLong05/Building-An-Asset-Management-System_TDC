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

            $table->enum('TinhTrang', ['Đang bảo trì', 'Hoàn thành'])->default('Đang bảo trì');
            // Đang Xử Lý | Hoàn Thành
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('assigned_to')->nullable();

            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();

            $table->timestamps();
            $table->softDeletes();

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
