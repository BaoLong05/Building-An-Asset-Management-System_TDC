<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BaoTri;
use App\Models\DanhMuc;
use App\Models\TaiSan;
use App\Models\Phong;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function Dashboard_index()
    {
        //lay ra tong kpi
        //tai san
        $total_taisan = TaiSan::count();
        $good_taisan = TaiSan::where('TinhTrang', 'Tốt')->count();
        $maintenance_taisan = TaiSan::where('TinhTrang', 'Đang bảo trì')->count();
        $broken_taisan = TaiSan::where('TinhTrang', 'Hỏng')->count();
        //danhmuc
        $total_danhmuc = DanhMuc::count();
        //baotri
        $maintenance_baotri = BaoTri::where('TinhTrang', 'Đang bảo trì')->count();
        $complete_baotri = BaoTri::where('TinhTrang', 'Hoàn thành')->count();

        //trạng thái biểu đồ tài sản

        $TaiSanStatusChart = [
            ['name' => 'Tốt', 'value' => $good_taisan],
            ['name' => 'Đang bảo trì', 'value' => $maintenance_taisan],
            ['name' => 'Hỏng', 'value' => $broken_taisan]
        ];

        //trạng thái biểu đồ bảo trì
        $BaotriStatusChart = [
            ['name' => 'Đang bảo trì', 'value' => $maintenance_baotri],
            ['name' => 'Hoàn thành', 'value' => $complete_baotri]
        ];

        //xu hướng bảo trì

        $baotri_trend = BaoTri::selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        //chỉ số danh mục
        $danhmuc_stats = TaiSan::select('MaDanhMuc', DB::raw('COUNT(*) as total'))
            ->groupBy('MaDanhMuc')
            ->get();

        //tài sản hỏng
        $taisan_hong = TaiSan::with(['phong', 'danhmuc'])
            ->where('taisan.TinhTrang', 'Hỏng')
            ->select(
                'MaTaiSan',
                'TenTaiSan',
                'MaPhong',
                'MaDanhMuc',
                'TinhTrang'
            )
            ->latest('taisan.created_at')
            ->limit(5)
            ->get();

        //chưa giải quyết bảo trì
        $baotri_pending = BaoTri::join('taisan', 'baotri.MaTaiSan', '=', 'taisan.MaTaiSan')
            ->join('phong', 'taisan.MaPhong', '=', 'phong.MaPhong')
            ->where('baotri.TinhTrang', 'Đang bảo trì')
            ->select(
                'baotri.MaBaoTri',
                'taisan.TenTaiSan',
                'phong.TenPhong as location',
                'baotri.TinhTrang'
            )
            ->orderBy('baotri.created_at', 'desc')
            ->limit(5)
            ->get();

        //hoàn thành bảo trì
        $baotri_hoanthanh = BaoTri::join('taisan', 'baotri.MaTaiSan', '=', 'taisan.MaTaiSan')
            ->join('phong', 'taisan.MaPhong', '=', 'phong.MaPhong')
            ->where('baotri.TinhTrang', 'Hoàn thành')
            ->select('baotri.MaBaoTri', 'taisan.TenTaiSan', 'baotri.TinhTrang', 'phong.TenPhong')
            ->orderBy('baotri.created_at', 'desc')
            ->limit(5)
            ->get();

        //tra về json
        return response()->json([
            'success' => true,
            'message' => 'Thống Kê Tài Sản',
            'kpi' => [
                'taisan' => $total_taisan,
                'tot' => $good_taisan,
                'baotri' => $maintenance_taisan,
                'hong' => $broken_taisan,
                'danhmuc' => $total_danhmuc,
                'baotriDangBaoTri' => $maintenance_baotri,
                'baotriHoanThanh' => $complete_baotri
            ],

            'taisanBieuDo' => $TaiSanStatusChart,
            'baotriBieuDo' => $BaotriStatusChart,
            'baotriXuHuong' => $baotri_trend,
            'danhmucChiSo' => $danhmuc_stats,
            'taisanHong' => $taisan_hong,
            'baotriChuaXuLy' => $baotri_pending,
            'baotriDaHoanThanh' => $baotri_hoanthanh

        ]);
    }
}
