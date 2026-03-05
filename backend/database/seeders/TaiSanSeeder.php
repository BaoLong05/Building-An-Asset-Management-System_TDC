<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaiSanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('taisan')->insert([
         [
                'TenTaiSan' => 'Máy tính Dell',
                'MaDanhMuc' => 1,
                'MaPhong' => 1,
                'SoLuong' => 10,
                'DonGia' => 15000000,
                'NgayNhap' => '2026-01-10',
                'TinhTrang' => 'Tot',
                'GhiChu' => 'Dùng cho phòng IT',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'TenTaiSan' => 'Máy chiếu Epson',
                'MaDanhMuc' => 2,
                'MaPhong' => 2,
                'SoLuong' => 3,
                'DonGia' => 8000000,
                'NgayNhap' => '2026-02-05',
                'TinhTrang' => 'Tot',
                'GhiChu' => 'Phòng họp',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'TenTaiSan' => 'Bàn làm việc',
                'MaDanhMuc' => 3,
                'MaPhong' => 3,
                'SoLuong' => 20,
                'DonGia' => 1200000,
                'NgayNhap' => '2026-02-20',
                'TinhTrang' => 'Moi',
                'GhiChu' => 'Bàn nhân viên',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
