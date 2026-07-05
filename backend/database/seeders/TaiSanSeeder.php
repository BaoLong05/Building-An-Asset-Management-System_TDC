<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaiSanSeeder extends Seeder
{
    public function run(): void
    {
        $danhMuc = DB::table('danhmuc')->pluck('MaDanhMuc', 'TenDanhMuc');
        $phong = DB::table('phong')->pluck('MaPhong', 'TenPhong');

        $assets = [
            // A101 - Phòng học chính
            ['Bàn giáo viên', 'Bàn', 'A101', 'Tốt', 'Bàn gỗ cao cấp', 'TS-BGV-001'],
            ['Bàn học sinh 01', 'Bàn', 'A101', 'Tốt', 'Bàn gỗ công nghiệp', 'TS-BHS-101-01'],
            ['Bàn học sinh 02', 'Bàn', 'A101', 'Tốt', 'Bàn gỗ công nghiệp', 'TS-BHS-101-02'],
            ['Bàn học sinh 03', 'Bàn', 'A101', 'Tốt', 'Bàn gỗ công nghiệp', 'TS-BHS-101-03'],
            ['Ghế giáo viên', 'Ghế', 'A101', 'Tốt', 'Ghế xoay lưng lưới', 'TS-GGV-001'],
            ['Ghế học sinh 01', 'Ghế', 'A101', 'Tốt', 'Ghế nhựa xanh', 'TS-GHS-101-01'],
            ['Ghế học sinh 02', 'Ghế', 'A101', 'Tốt', 'Ghế nhựa xanh', 'TS-GHS-101-02'],
            ['Máy tính để bàn Dell', 'Máy tính để bàn', 'A101', 'Tốt', 'Cấu hình cao phục vụ giảng dạy', 'TS-MT-001'],
            ['Màn hình LCD 24"', 'Màn hình', 'A101', 'Tốt', 'Màn hình Dell', 'TS-MH-001'],
            ['Bàn phím Logitech', 'Bàn phím', 'A101', 'Tốt', 'Bàn phím cơ', 'TS-BP-001'],
            ['Chuột Logitech', 'Chuột', 'A101', 'Tốt', 'Chuột quang', 'TS-CT-001'],
            ['Máy chiếu Epson A101', 'Máy chiếu', 'A101', 'Tốt', 'Độ phân giải Full HD', 'TS-MC-001'],
            ['Máy lạnh 1.5HP A101-01', 'Máy lạnh', 'A101', 'Tốt', 'Inverter tiết kiệm điện', 'TS-ML-101-01'],
            ['Máy lạnh 1.5HP A101-02', 'Máy lạnh', 'A101', 'Tốt', 'Inverter tiết kiệm điện', 'TS-ML-101-02'],
            ['Bảng tương tác thông minh', 'Bảng tương tác', 'A101', 'Tốt', 'Màn hình cảm ứng 65"', 'TS-BTT-001'],
            ['Bục giảng A101', 'Bục giảng', 'A101', 'Tốt', 'Bục gỗ sơn tĩnh điện', 'TS-BG-001'],
            ['Loa kéo di động', 'Loa', 'A101', 'Tốt', 'Công suất 50W', 'TS-LKD-001'],

            // B101 - Phòng học
            ['Bàn giáo viên B101', 'Bàn', 'B101', 'Tốt', 'Bàn gỗ cao cấp', 'TS-BGV-002'],
            ['Bàn học sinh B101-01', 'Bàn', 'B101', 'Tốt', 'Bàn gỗ công nghiệp', 'TS-BHS-101-04'],
            ['Bàn học sinh B101-02', 'Bàn', 'B101', 'Tốt', 'Bàn gỗ công nghiệp', 'TS-BHS-101-05'],
            ['Ghế học sinh B101-01', 'Ghế', 'B101', 'Tốt', 'Ghế nhựa xanh', 'TS-GHS-101-03'],
            ['Máy tính để bàn HP', 'Máy tính để bàn', 'B101', 'Tốt', 'Phục vụ giảng dạy', 'TS-MT-002'],
            ['Màn hình LCD 22"', 'Màn hình', 'B101', 'Đang bảo trì', 'Màn hình bị nhấp nháy', 'TS-MH-002'],
            ['Máy chiếu Panasonic', 'Máy chiếu', 'B101', 'Tốt', 'Độ phân giải Full HD', 'TS-MC-002'],
            ['Máy lạnh 1.5HP B101-01', 'Máy lạnh', 'B101', 'Tốt', 'Inverter tiết kiệm điện', 'TS-ML-101-03'],
            ['Máy lạnh 1.5HP B101-02', 'Máy lạnh', 'B101', 'Tốt', 'Inverter tiết kiệm điện', 'TS-ML-101-04'],
            ['Bục giảng B101', 'Bục giảng', 'B101', 'Tốt', 'Bục gỗ sơn tĩnh điện', 'TS-BG-002'],

            // B201A - Phòng thực hành máy tính
            ['Bàn máy tính đôi B201A-01', 'Bàn', 'B201A', 'Tốt', 'Bàn đôi để được 2 máy', 'TS-BMT-001'],
            ['Bàn máy tính đôi B201A-02', 'Bàn', 'B201A', 'Tốt', 'Bàn đôi để được 2 máy', 'TS-BMT-002'],
            ['Ghế xoay văn phòng B201A-01', 'Ghế', 'B201A', 'Tốt', 'Ghế xoay có tựa tay', 'TS-GXV-001'],
            ['Máy chiếu Epson B201A', 'Máy chiếu', 'B201A', 'Tốt', 'Độ phân giải 4K', 'TS-MC-003'],
            ['Router Cisco', 'Router', 'B201A', 'Tốt', 'Router wifi 6', 'TS-RT-001'],
            ['Máy lạnh 2HP B201A', 'Máy lạnh', 'B201A', 'Tốt', 'Inverter', 'TS-ML-201-01'],

            // B201B - Phòng thực hành
            ['Laptop Dell Latitude 01', 'Laptop', 'B201B', 'Tốt', 'Laptop giảng dạy', 'TS-LT-001'],
            ['Laptop Dell Latitude 02', 'Laptop', 'B201B', 'Tốt', 'Laptop giảng dạy', 'TS-LT-002'],
            ['Laptop Dell Latitude 03', 'Laptop', 'B201B', 'Tốt', 'Laptop giảng dạy', 'TS-LT-003'],
            ['Loa âm trần B201B-01', 'Loa', 'B201B', 'Tốt', 'Loa gắn trần 30W', 'TS-LAT-001'],
            ['Loa âm trần B201B-02', 'Loa', 'B201B', 'Tốt', 'Loa gắn trần 30W', 'TS-LAT-002'],
            ['Quạt trần B201B-01', 'Quạt', 'B201B', 'Tốt', 'Quạt trần cánh gỗ', 'TS-QT-001'],

            // B202A - Phòng họp
            ['Bàn họp', 'Bàn', 'B202A', 'Tốt', 'Bàn họp dài 3m', 'TS-BH-001'],
            ['Ghế họp 01', 'Ghế', 'B202A', 'Tốt', 'Ghế xoay da', 'TS-GH-001'],
            ['Ghế họp 02', 'Ghế', 'B202A', 'Tốt', 'Ghế xoay da', 'TS-GH-002'],
            ['Tủ hồ sơ B202A-01', 'Tủ hồ sơ', 'B202A', 'Đang bảo trì', 'Tủ sắt 4 cánh', 'TS-THS-001'],
            ['Tủ hồ sơ B202A-02', 'Tủ hồ sơ', 'B202A', 'Đang bảo trì', 'Tủ sắt 4 cánh', 'TS-THS-002'],
            ['Ổn áp điện tử', 'Ổn áp/UPS', 'B202A', 'Tốt', 'Ổn áp 10KVA', 'TS-OA-001'],

            // B202B - Phòng thiết bị mạng
            ['Switch 24 port', 'Thiết bị mạng', 'B202B', 'Tốt', 'Switch Cisco 24 port', 'TS-SW-001'],
            ['Camera IP B202B-01', 'Camera', 'B202B', 'Tốt', 'Camera IP 2K', 'TS-CAM-001'],
            ['Camera IP B202B-02', 'Camera', 'B202B', 'Tốt', 'Camera IP 2K', 'TS-CAM-002'],
            ['Router dự phòng', 'Router', 'B202B', 'Tốt', 'Router TP-Link', 'TS-RT-002'],

            // B203A - Phòng lab
            ['Access Point UniFi 01', 'Thiết bị mạng', 'B203A', 'Tốt', 'AP wifi 6 mesh', 'TS-AP-001'],
            ['Access Point UniFi 02', 'Thiết bị mạng', 'B203A', 'Tốt', 'AP wifi 6 mesh', 'TS-AP-002'],
            ['UPS APC', 'Ổn áp/UPS', 'B203A', 'Hỏng', 'Hỏng bình, cần thay pin', 'TS-UPS-001'],

            // B203B - Phòng giáo viên
            ['Máy in HP LaserJet', 'Máy in', 'B203B', 'Tốt', 'Máy in laser trắng đen', 'TS-MI-001'],
            ['Đèn chiếu Led B203B-01', 'Đèn chiếu', 'B203B', 'Tốt', 'Đèn LED 40W', 'TS-DC-001'],
            ['Đèn chiếu Led B203B-02', 'Đèn chiếu', 'B203B', 'Tốt', 'Đèn LED 40W', 'TS-DC-002'],
            ['Quạt trần B203B-01', 'Quạt', 'B203B', 'Tốt', 'Quạt trần cánh nhựa', 'TS-QT-002'],
            ['Ghế giáo viên B203B-01', 'Ghế', 'B203B', 'Tốt', 'Ghế xoay lưng lưới', 'TS-GGV-002'],
            ['Ghế giáo viên B203B-02', 'Ghế', 'B203B', 'Tốt', 'Ghế xoay lưng lưới', 'TS-GGV-003'],
        ];

        $data = [];
        foreach ($assets as $item) {
            $data[] = [
                'TenTaiSan' => $item[0],
                'MaDanhMuc' => $danhMuc[$item[1]] ?? null,
                'MaPhong' => $phong[$item[2]] ?? null,
                'MaTaiSanRieng' => $item[5],
                'TinhTrang' => $item[3],
                'GhiChu' => $item[4] ?? 'Tài sản trường học',
                'NgayNhap' => Carbon::now()->subDays(rand(1, 180)),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('taisan')->insert($data);
    }
}
