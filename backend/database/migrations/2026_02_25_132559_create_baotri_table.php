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

            $table->date('NgayBaoTri')->nullable();
            $table->string('NoiDung')->nullable();
            $table->decimal('ChiPhi', 18, 2)->nullable();
            $table->string('TrangThai')->default('DangXuLy');

            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('MaTaiSan')
                ->references('MaTaiSan')
                ->on('taisan')
                ->onDelete('cascade')
                ->onUpdate('cascade');
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
