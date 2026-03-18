<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaiSanSeeder extends Seeder
{
    public function run(): void
    {
        $data = [];

        for ($i = 1; $i <= 15; $i++) {
            $data[] = [
                'TenTaiSan' => 'Tài sản IT ' . $i,
                'MaDanhMuc' => rand(1, 5),
                'MaPhong' => 1, // cùng 1 phòng
                'SoLuong' => rand(1, 5),
                'DonGia' => rand(1000000, 10000000),
                'NgayNhap' => '2026-03-01',
                'TinhTrang' => 'Tốt',
                'GhiChu' => 'Thiết bị phòng IT',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('taisan')->insert($data);
    }
}