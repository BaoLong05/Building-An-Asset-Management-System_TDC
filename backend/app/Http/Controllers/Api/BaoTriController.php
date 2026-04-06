<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BaoTri;
use App\Models\TaiSan;
use Illuminate\Support\Facades\Auth;

class BaoTriController extends Controller
{
    // =========================
    // DANH SÁCH
    // =========================
    public function baotri_index(Request $request)
    {
        $request->validate([
            'search'=> 'nullable|string|max:255'
        ]);
        $query = BaoTri::with(
            'taisan',
            'creator:id,name',
            'assignee:id,name'
        )
            ->whereNull('deleted_at');

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
            'NoiDung' => 'nullable|string',
            'assigned_to' => 'required|exists:users,id',
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
            'created_by' => Auth::id(),
            'assigned_to' => $request->assigned_to
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
        if ($baotri->assigned_to  != Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền cập nhật bảo trì này!'
            ], 403);
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
            'updated_by' => Auth::id(),
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
        $history = BaoTri::with([
            'creator:id,name',
            'assignee:id,name',
            'taisan:MaTaiSan,TenTaiSan'
        ])
            ->where('MaTaiSan', $MaTaiSan)
            ->orderBy('updated_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Lấy lịch sử bảo trì thành công!',
            'data' => $history
        ]);
    }

    //thong bao ca nhan bao tri
    public function myTask(Request $request)
    {
        $userId = $request->user()->id;
        $task = BaoTri::with('taisan:MaTaiSan,TenTaiSan')
            ->where('assigned_to', $userId)
            ->where('TinhTrang', 'Đang bảo trì')
            ->where('is_read', false)
            ->orderBy('NgayBaoTri', 'desc')
            ->get();
        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Không thể lấy danh sách thông báo!'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'thông báo của bạn!',
            'data' => $task
        ]);
    }
    //danh dau da doc 1 cai
    public function Readed($id)
    {
        $baotri = BaoTri::find($id);
        if (!$baotri) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy!'
            ]);
        }
        if ($baotri->assigned_to != Auth::user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Bạn không có quyền!'
            ], 403);
        }
        $baotri->update([
            'is_read' => true
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Đã đánh dấu đã đọc'
        ]);
    }

    //danh dau da doc toan bo
    public function Readed_All()
    {
        BaoTri::where('assigned_to', Auth::user()->id)
            ->where('TinhTrang', 'Đang bảo trì')
            ->update(['is_read' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Đã đánh dấu tất cả'
        ]);
    }
}
