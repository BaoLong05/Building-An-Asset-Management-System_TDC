<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('phong')->insert([
            ['TenPhong' => 'Phòng IT'],
            ['TenPhong' => 'Phòng họp'],
            ['TenPhong' => 'Phòng làm việc'],
        ]);
    }
}
