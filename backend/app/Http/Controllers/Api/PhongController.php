<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Phong;
use App\Models\TaiSan;

class PhongController extends Controller
{

    //lay danh sach, phan trang va tim kiem
    public function phong_index(Request $request)
    {
        $request->validate([
            'search' => 'nullable|string|max:255'
        ]);
        $query = Phong::query();

        //soft delelte
        $query->whereNull('deleted_at');
        //tim kiem
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('TenPhong', 'LIKE', "%$search%")
                    ->orWhere('ViTri', 'LIKE', "%$search%")
                    ->orWhere('MaPhong', 'LIKE', "%$search%");
            });
        }

        $phong = $query->orderBy('MaPhong', 'desc')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $phong
        ]);
    }

    //them phong
    public function phong_store(Request $request)
    {
        $request->validate([
            'TenPhong' => 'required|string|max:255|unique:phong,TenPhong',
            'ViTri' => 'required|string|max:500'
        ]);

        $phong = Phong::create([
            'TenPhong' => $request->TenPhong,
            'ViTri' => $request->ViTri,
            'created_by' => 1 //auth()->id()
        ], [
            // TenPhong
            'TenPhong.required' => 'Tên phòng không được để trống',
            'TenPhong.max' => 'Tên phòng không được vượt quá 255 ký tự',
            'TenPhong.unique' => 'Tên phòng đã tồn tại',

            // ViTri
            'ViTri.required' => 'Vị trí phòng không được để trống',
            'ViTri.max' => 'Vị trí không được vượt quá 500 ký tự',

        ]);

        return response()->json([
            "success" => true,
            "message" => "Thêm Phòng Thành Công",
            "data" => $phong
        ]);
    }

    //sua phong
    public function phong_update(Request $request, $id)
    {

        $request->validate([
            'TenPhong' => 'required|string|max:255|unique:phong,TenPhong,' . $id . ',MaPhong',
            'ViTri' => 'required|string|max:500',
            'updated_at' => 'required'
        ], [
            // TenPhong
            'TenPhong.required' => 'Tên phòng không được để trống',
            'TenPhong.max' => 'Tên phòng không được vượt quá 255 ký tự',
            'TenPhong.unique' => 'Tên phòng đã tồn tại',

            // ViTri
            'ViTri.required' => 'Vị trí phòng không được để trống',
            'ViTri.max' => 'Vị trí không được vượt quá 500 ký tự',

            // updated_at
            'updated_at.required' => 'Dữ liệu phòng đã thay đổi, vui lòng tải lại trang'
        ]);

        $phong = Phong::find($id);
        if (!$phong) {
            return response()->json([
                "success" => false,
                "message" => "Không tìm thấy phòng!"
            ], 404);
        }
        //kiem tra cap nhat test
        if ($request->updated_at != $phong->updated_at->toISOString()) {
            return response()->json([
                "success" => false,
                "message" => "Phòng đã bị chỉnh sửa trước đó. Vui lòng reload lại trang!"
            ], 409);
        }

        $phong->update([
            'TenPhong' => $request->TenPhong,
            'ViTri' => $request->ViTri,
            'updated_by' => 1 // auth()->id()
        ]);

        return response()->json([
            "success" => true,
            "message" => "Sửa phòng thành công!",
            "data" => $phong
        ]);
    }

    public function phong_delete($id)
    {
        $phong = Phong::find($id);
        if (!$phong) {
            return response()->json([
                "success" => false,
                "message" => "Không tìm thấy phòng!"
            ], 404);
        }

        $phong->deleted_by = 1;
        $phong->save();

        $phong->delete();

        return response()->json([
            "success" => true,
            "message" => "Xóa Phòng Thành Công!",
            "data" => $phong
        ]);
    }

    //tai san chi tiet trong 1 phong
    public function phong_asset($id)
    {
        $asset = TaiSan::where('MaPhong', $id)
            ->whereNull('deleted_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        return response()->json([
            "success" => true,
            "data" => $asset
        ]);
    }
}
