<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PhongSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['TenPhong' => 'A101', 'ViTri' => 'Tầng 1, Khu A'],
            ['TenPhong' => 'B101', 'ViTri' => 'Tầng 1, Khu B'],
            ['TenPhong' => 'B201A', 'ViTri' => 'Tầng 2, Khu B'],
            ['TenPhong' => 'B201B', 'ViTri' => 'Tầng 2, Khu B'],
            ['TenPhong' => 'B202A', 'ViTri' => 'Tầng 2, Khu B'],
            ['TenPhong' => 'B202B', 'ViTri' => 'Tầng 2, Khu B'],
            ['TenPhong' => 'B203A', 'ViTri' => 'Tầng 2, Khu B'],
            ['TenPhong' => 'B203B', 'ViTri' => 'Tầng 2, Khu B'],
        ];

        DB::table('phong')->insert($data);
    }
}
