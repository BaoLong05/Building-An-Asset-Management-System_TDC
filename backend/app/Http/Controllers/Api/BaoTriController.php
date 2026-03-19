<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BaoTri;
use App\Models\TaiSan;

class BaoTriController extends Controller
{
    // =========================
    // DANH SÁCH
    // =========================
    public function baotri_index(Request $request)
    {
        $query = BaoTri::with('taisan')->whereNull('deleted_at');

        if ($request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('MaTaiSan', 'LIKE', "%$search%")
                    ->orWhere('NoiDung', 'LIKE', "%$search%")
                    ->orWhere('TinhTrang', 'LIKE', "%$search%")
                    ->orWhereHas('taisan', function ($sub) use ($search) {
                        $sub->where('TenTaiSan', 'LIKE', "%$search%");
                    });
            });
        }

        $baotri = $query->orderBy('NgayBaoTri', 'desc')->paginate(10);

        return response()->json([
            'success' => true,
            'message' => 'Lấy danh sách bảo trì thành công!',
            'data' => $baotri
        ]);
    }
    //tao bao tri
    public function baotri_store(Request $request)
    {
        $request->validate([
            'MaTaiSan' => 'required|exists:taisan,MaTaiSan',
            'NoiDung' => 'nullable|string'
        ]);

        $exists = BaoTri::where('MaTaiSan', $request->MaTaiSan)
            ->where('TinhTrang', 'Đang bảo trì')
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Tài sản này đang bảo trì!'
            ]);
        }

        $baotri = BaoTri::create([
            'MaTaiSan' => $request->MaTaiSan,
            'NgayBaoTri' => now(),
            'NoiDung' => $request->NoiDung,
            'TinhTrang' => 'Đang bảo trì',
            'created_by' => 1,
        ]);

        $baotri->taisan->update([
            'TinhTrang' => 'Đang bảo trì'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đã tạo yêu cầu bảo trì!',
            'data' => $baotri
        ]);
    }

    //cap nhat bao tri
    public function baotri_update(Request $request, $id)
    {
        $request->validate([
            'TinhTrang' => 'required|in:Đang bảo trì,Hoàn thành',
            'NoiDung' => 'nullable|string',
            'updated_at' => 'required'
        ]);

        $baotri = BaoTri::find($id);

        if (!$baotri) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!'
            ]);
        }

        if ($baotri->TinhTrang == 'Hoàn thành') {
            return response()->json([
                'success' => false,
                'message' => 'Bảo trì đã hoàn thành, không thể chỉnh sửa!'
            ]);
        }

        if ($request->updated_at != $baotri->updated_at->toISOString()) {
            return response()->json([
                'success' => false,
                'message' => 'Dữ liệu đã bị thay đổi, vui lòng reload!'
            ]);
        }

        $baotri->update([
            'TinhTrang' => $request->TinhTrang,
            'NoiDung' => $request->NoiDung,
            'updated_by' => 1,
        ]);

        // cap nhat trang thai tai san
        if ($baotri->taisan) {
            $baotri->taisan->update([
                'TinhTrang' => $request->TinhTrang == 'Hoàn thành'
                    ? 'Tốt'
                    : 'Đang bảo trì'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => $request->TinhTrang == 'Hoàn thành'
                ? 'Đã hoàn thành bảo trì!'
                : 'Đã cập nhật trạng thái bảo trì!',
            'data' => $baotri
        ]);
    }

   //lich su
    public function baotri_history($MaTaiSan)
    {
        $history = BaoTri::where('MaTaiSan', $MaTaiSan)
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Lấy lịch sử bảo trì thành công!',
            'data' => $history
        ]);
    }

   
}