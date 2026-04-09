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

        $danhMucs = DB::table('danhmuc')->pluck('MaDanhMuc')->toArray();
        $phongs = DB::table('phong')->pluck('MaPhong')->toArray();

        $tenTaiSans = [
            'Máy tính Dell', 'Laptop HP', 'Màn hình Samsung', 'Chuột Logitech',
            'Bàn phím cơ', 'Router TP-Link', 'Switch Cisco', 'Máy in Canon',
            'Máy chiếu Epson', 'Ổ cứng SSD', 'USB Kingston', 'NAS Synology',
            'Tai nghe Sony', 'Webcam Logitech', 'Server Dell', 'UPS APC',
            'Ghế văn phòng', 'Bàn làm việc', 'Máy scan HP', 'Máy photocopy Ricoh',
            'Access Point UniFi', 'Màn hình LG', 'Laptop Asus', 'Chuột không dây',
            'Bàn phím Logitech'
        ];

        $tinhTrangs = array_merge(
            array_fill(0, 10, 'Tốt'),
            array_fill(0, 10, 'Đang Bảo trì'),
            array_fill(0, 5, 'Hỏng')
        );

        shuffle($tinhTrangs);

        for ($i = 0; $i < 25; $i++) {
            $data[] = [
                'HinhAnh' => 'uploads/taisan/p.jpeg',
                'TenTaiSan' => $tenTaiSans[$i],
                'MaDanhMuc' => $danhMucs[array_rand($danhMucs)],
                'MaPhong' => $phongs[array_rand($phongs)],
                'SoLuong' => rand(1, 5),
                'NgayNhap' => Carbon::now()->subDays(rand(1, 30)),
                'TinhTrang' => $tinhTrangs[$i],
                'GhiChu' => 'Thiết bị CNTT',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('taisan')->insert($data);
    }
}