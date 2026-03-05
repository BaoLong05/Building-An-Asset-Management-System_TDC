<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TaiSan;

class TaiSanController extends Controller
{
    public function index()
    {
        $taisan = TaiSan::all();
        return response()->json($taisan);
    }

    // them tai san
    public function AssetManagement_store(Request $request)
    {
        $taisan = TaiSan::create([
            'TenTaiSan' => $request->TenTaiSan,
            'MaDanhMuc' => $request->MaDanhMuc,
            'MaPhong' => $request->MaPhong,
            'SoLuong' => $request->SoLuong,
            'DonGia' => $request->DonGia,
            'NgayNhap' => $request->NgayNhap,
            'TinhTrang' => $request->TinhTrang,
            'GhiChu' => $request->GhiChu,
        ]);
        return response()->json($taisan, 201);
    }

    //cap nhat tai san
    public function AssetManagement_Update(Request $request, $id)
    {
        $taisan = TaiSan::findOrFail($id);

        $taisan->update([
            'TenTaiSan' => $request->TenTaiSan,
            'MaDanhMuc' => $request->MaDanhMuc,
            'MaPhong' => $request->MaPhong,
            'SoLuong' => $request->SoLuong,
            'DonGia' => $request->DonGia,
            'NgayNhap' => $request->NgayNhap,
            'TinhTrang' => $request->TinhTrang,
            'GhiChu' => $request->GhiChu
        ]);
        return response()->json($taisan);
    }

    //xoa tai san
    public function AssetManagement_Delete($id)
    {
        $taisan = TaiSan::findOrFail($id);
        $taisan->delete();
        return response()->json(['message' => 'Xóa thành công']);
    }

    //bao tri tai san
    public function AssetManagement_Maintenance(Request $request, $id)
    {
        $taisan = TaiSan::findOrFail($id);

        $taisan->update([
            'TinhTrang' => $request->TinhTrang,
            'GhiChu' => $request->GhiChu
        ]);

        return response()->json([
            'message' => 'Cập nhật trạng thái thành công',
            'data' => $taisan
        ]);
    }
}
