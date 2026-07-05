<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DanhMucSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('danhmuc')->insert([
            ['TenDanhMuc' => 'Bàn'],
            ['TenDanhMuc' => 'Ghế'],
            ['TenDanhMuc' => 'Bàn phím'],
            ['TenDanhMuc' => 'Màn hình'],
            ['TenDanhMuc' => 'Chuột'],
            ['TenDanhMuc' => 'Router'],
            ['TenDanhMuc' => 'Máy chiếu'],
            ['TenDanhMuc' => 'Máy lạnh'],
            ['TenDanhMuc' => 'Máy tính để bàn'],
            ['TenDanhMuc' => 'Laptop'],
            ['TenDanhMuc' => 'Máy in'],
            ['TenDanhMuc' => 'Bảng tương tác'],
            ['TenDanhMuc' => 'Loa'],
            ['TenDanhMuc' => 'Quạt'],
            ['TenDanhMuc' => 'Tủ hồ sơ'],
            ['TenDanhMuc' => 'Camera'],
            ['TenDanhMuc' => 'Đèn chiếu'],
            ['TenDanhMuc' => 'Ổn áp/UPS'],
            ['TenDanhMuc' => 'Bục giảng'],
            ['TenDanhMuc' => 'Thiết bị mạng'],
            ['TenDanhMuc' => 'Khác'],
        ]);
    }
}
