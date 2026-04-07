<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DanhMuc;
use Illuminate\Support\Facades\Auth;

class DanhMucController extends Controller
{
    public function danhmuc_index(Request $request)
    {
        $request->validate([
            'search' => 'nullable|string|max:255'
        ]);
        $query = DanhMuc::query();
        //soft delete
        $query->whereNull('deleted_at');

        //tim kiem
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                if (is_numeric($search)) {
                    $q->orWhere('MaDanhMuc', (int)$search);
                }
                $q->orWhere('TenDanhMuc', 'LIKE', "%$search%")
                    ->orWhere('MoTa', 'LIKE', "%$search%");
            });
        }
        $danhmuc = $query->orderByDesc('MaDanhMuc')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $danhmuc
        ]);
    }

    //them danh muc
    public function store_danhmuc(Request $request)
    {
        $request->validate([
            'TenDanhMuc' => 'required|string|max:255',
            'MoTa' => 'nullable|string|max:500'
        ]);
        $danhmuc = DanhMuc::create([
            'TenDanhMuc' => $request->TenDanhMuc,
            'MoTa' => $request->MoTa,
            'created_by' => Auth::id(),
        ]);

        return response()->json([
            "success" => true,
            "message" => "Thêm Danh Mục Thành Công",
            "data" => $danhmuc
        ]);
    }

    //sua danh muc
    public function update_danhmuc(Request $request, $id)
    {
        $request->validate([
            'TenDanhMuc' => 'required|string|max:255',
            'MoTa' => 'nullable|string|max:500',
            'updated_at' => 'required'
        ]);

        $danhmuc = DanhMuc::find($id);

        if (!$danhmuc) {
            return response()->json([
                'success' => false,
                'message' => 'Danh mục không tồn tại.'
            ], 404);
        }

        // kiểm tra optimistic locking
        if ($request->updated_at != $danhmuc->updated_at->toISOString()) {
            return response()->json([
                'success' => false,
                'message' => 'Danh mục đã bị chỉnh sửa trước đó. Vui lòng reload lại trang.'
            ], 409);
        }

        $danhmuc->update([
            'TenDanhMuc' => $request->TenDanhMuc,
            'MoTa' => $request->MoTa,
            'updated_by' => Auth::id(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Sửa danh mục thành công!',
            'data' => $danhmuc
        ]);
    }
    //xoa danh muc
    public function delete_danhmuc($id)
    {
        $danhmuc = DanhMuc::find($id);
        if (!$danhmuc) {
            return response()->json([
                'success' => false,
                'message' => 'Danh mục không tồn tại.'
            ], 404);
        }
        $danhmuc->deleted_by = Auth::id();
        $danhmuc->save();

        $danhmuc->delete();
        return response()->json([
            'success' => true,
            'message' => 'Xóa danh mục thành công!'
        ]);
    }
}
