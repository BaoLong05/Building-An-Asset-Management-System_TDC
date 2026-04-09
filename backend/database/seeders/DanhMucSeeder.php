<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DanhMucSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('danhmuc')->insert([
            // Thiết bị máy tính
            ['TenDanhMuc' => 'Máy tính để bàn'],
            ['TenDanhMuc' => 'Laptop'],
            ['TenDanhMuc' => 'Server'],

            ['TenDanhMuc' => 'Màn hình'],
            ['TenDanhMuc' => 'Máy chiếu'],

            ['TenDanhMuc' => 'Bàn phím'],
            ['TenDanhMuc' => 'Chuột'],
            ['TenDanhMuc' => 'Tai nghe'],
            ['TenDanhMuc' => 'Webcam'],
            ['TenDanhMuc' => 'Router'],
            ['TenDanhMuc' => 'Switch'],
            ['TenDanhMuc' => 'Access Point'],

            ['TenDanhMuc' => 'Máy in'],
            ['TenDanhMuc' => 'Máy scan'],
            ['TenDanhMuc' => 'Máy photocopy'],
            ['TenDanhMuc' => 'Ổ cứng'],
            ['TenDanhMuc' => 'USB'],
            ['TenDanhMuc' => 'NAS'],

            ['TenDanhMuc' => 'UPS'],

            ['TenDanhMuc' => 'Bàn làm việc'],
            ['TenDanhMuc' => 'Ghế'],
            ['TenDanhMuc' => 'Khác'],
        ]);
    }
}