<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DanhMucSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('danhmuc')->insert([
            ['TenDanhMuc' => 'Máy tính'],
            ['TenDanhMuc' => 'Thiết bị trình chiếu'],
            ['TenDanhMuc' => 'Nội thất'],
            ['TenDanhMuc' => 'Thiết bị mạng'],
            ['TenDanhMuc' => 'Thiết bị văn phòng'],
            ['TenDanhMuc' => 'Máy in'],
            ['TenDanhMuc' => 'Máy scan'],
            ['TenDanhMuc' => 'Thiết bị lưu trữ'],
            ['TenDanhMuc' => 'Thiết bị âm thanh'],
            ['TenDanhMuc' => 'Camera'],
            ['TenDanhMuc' => 'Điều hòa'],
            ['TenDanhMuc' => 'Quạt'],
            ['TenDanhMuc' => 'Bàn ghế'],
            ['TenDanhMuc' => 'Máy photocopy'],
            ['TenDanhMuc' => 'Laptop'],
            ['TenDanhMuc' => 'Server'],
            ['TenDanhMuc' => 'UPS'],
            ['TenDanhMuc' => 'Thiết bị hội nghị'],
            ['TenDanhMuc' => 'Thiết bị điện'],
            ['TenDanhMuc' => 'Khác']
        ]);
    }
}