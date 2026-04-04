<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TaiSan;
use App\Models\BaoTri;
use Exception;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\isEmpty;

class TaiSanController extends Controller
{
    public function index(Request $request)
    {
        $query = TaiSan::with('phong', 'danhmuc')->whereNull('deleted_at');

        // Tìm kiếm
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('TenTaiSan', 'LIKE', "%$search%")
                    ->orWhereHas('phong', function ($q2) use ($search) {
                        $q2->where('TenPhong', 'LIKE', "%$search%");
                    })
                    ->orWhereHas('danhmuc', function ($q3) use ($search) {
                        $q3->where('TenDanhMuc', 'LIKE', "%$search%");
                    });
            });
        }

        // Lọc theo tình trạng
        if ($request->TinhTrang) {
            $query->where('TinhTrang', $request->TinhTrang);
        }
        $taisan = $query->orderBy('MaTaiSan', 'desc')->paginate(10);

        if (!$taisan) {
            return response()->json([
                'success' => false,
                'message' => 'Lỗi khi gọi serve!'
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Lấy danh sách tài sản thành công!',
                'data' => $taisan
            ]);
        }
    }

    public function AssetManagement_store(Request $request)
    {

        $validated = $request->validate([
            'HinhAnh' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'TenTaiSan' => 'required|string|max:255',
            'MaDanhMuc' => 'required|exists:danhmuc,MaDanhMuc',
            'MaPhong' => 'required|exists:phong,MaPhong',
            'SoLuong' => 'required|integer|min:1',
            'NgayNhap' => 'required|date',
            'TinhTrang' => 'required|in:Tốt',
        ], [
            'HinhAnh.image' => 'File phải là hình ảnh!',
            'HinhAnh.mimes' => 'Ảnh phải có định dạng jpg, jpeg, png, gif hoặc webp!',
            'HinhAnh.max' => 'Ảnh không được vượt quá 2MB!',

            'TenTaiSan.required' => 'Tên tài sản không được để trống!',
            'TenTaiSan.max' => 'Tên tài sản không quá 255 ký tự!',


            'MaDanhMuc.required' => 'Vui lòng chọn danh mục!',
            'MaDanhMuc.exists' => 'Danh mục không hợp lệ!',

            'MaPhong.required' => 'Vui lòng chọn phòng!',
            'MaPhong.exists' => 'Phòng không hợp lệ!',

            'SoLuong.required' => 'Số lượng không được để trống!',
            'SoLuong.integer' => 'Số lượng phải là số!',
            'SoLuong.min' => 'Số lượng phải lớn hơn 0!',

            'NgayNhap.required' => 'Vui lòng chọn ngày nhập!',
            'NgayNhap.date' => 'Ngày nhập không hợp lệ!',

            'TinhTrang.required' => 'Chưa chọn tình trạng!',
            'TinhTrang.in' => 'Trạng thái phải là "Tốt"!',
        ]);

        $imagePath = null;
        $imageUrl = null;

        if ($request->hasFile('HinhAnh')) {
            $imagePath = $request->file('HinhAnh')->store('taisan', 'public');
            $imageUrl = asset('storage/' . $imagePath);
        }
        $taisan = TaiSan::create([
            'HinhAnh' => $imageUrl,
            'TenTaiSan' => $validated['TenTaiSan'],
            'MaDanhMuc' => $validated['MaDanhMuc'],
            'MaPhong' => $validated['MaPhong'],
            'SoLuong' => $validated['SoLuong'],
            'NgayNhap' => $validated['NgayNhap'],
            'TinhTrang' => $validated['TinhTrang'],
            'GhiChu' => $validated['GhiChu'] ?? null,
            'created_by' => Auth::id(),
        ]);

        $taisan->load('phong', 'danhmuc');

        return response()->json([
            'success' => true,
            'message' => 'Thêm tài sản thành công!',
            'data' => [
                'MaTaiSan' => $taisan->MaTaiSan,
                'HinhAnh' => $taisan->HinhAnh,
                'HinhAnh_url' => $taisan->HinhAnh ? asset($taisan->HinhAnh) : null,
                'TenTaiSan' => $taisan->TenTaiSan,
                'MaDanhMuc' => $taisan->MaDanhMuc,
                'MaPhong' => $taisan->MaPhong,
                'SoLuong' => $taisan->SoLuong,
                'NgayNhap' => $taisan->NgayNhap,
                'TinhTrang' => $taisan->TinhTrang,
                'GhiChu' => $taisan->GhiChu,
                'phong' => $taisan->phong,
                'danhmuc' => $taisan->danhmuc,
            ]
        ], 201);

        return response()->json([
            'success' => false,
            'message' => 'Dữ liệu không hợp lệ!',
            'errors' => $e->errors(),
        ], 422);
    }

    //cap nhat tai san
    public function AssetManagement_Update(Request $request, $id)
    {
        $request->validate([
            'HinhAnh' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'TenTaiSan' => 'required|string|max:255',
            'SoLuong' => 'required|integer|min:1',
            'TinhTrang' => 'required|in:Tốt,Đang bảo trì,Hỏng',
            'MaTaiSan' => 'required|exists:taisan,MaTaiSan',
            'assigned_to' => 'nullable|exists:users,id',
        ], [
            'HinhAnh.image' => 'File phải là hình ảnh!',
            'HinhAnh.mimes' => 'Ảnh phải có định dạng jpg, jpeg, png, gif hoặc webp!',
            'HinhAnh.max' => 'Ảnh không được vượt quá 2MB!',

            'TenTaiSan.required' => 'Tên tài sản không được để trống',
            'TenTaiSan.max' => 'Tên tài sản không quá 255 ký tự',

            'SoLuong.required' => 'Số lượng không được để trống',
            'SoLuong.min' => 'Số lượng phải lớn hơn 0',

            'TinhTrang.required' => 'Vui lòng chọn trạng thái',
            'TinhTrang.in' => 'Trạng thái không hợp lệ',

        ]);
        $taisan = TaiSan::findOrFail($id);

        if (!$taisan) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy tài sản!'
            ], 404);
        }

        //chong sua trung
        if ($request->updated_at != $taisan->updated_at->toISOString()) {
            return response()->json([
                'success' => false,
                'message' => 'Tài sản đã bị chỉnh sửa trước đó, vui lòng reload lại trang!'
            ]);
        }
        $oldTinhTrang = $taisan->TinhTrang;

        try {
            $imagePath = null;
            $imageUrl = $taisan->HinhAnh;

            if ($request->hasFile('HinhAnh')) {
                $imagePath = $request->file('HinhAnh')->store('taisan', 'public');
                $imageUrl = asset('storage/' . $imagePath);
            }

            $taisan->update([
                'HinhAnh' => $imageUrl,
                'TenTaiSan' => $request->TenTaiSan,
                'MaDanhMuc' => $request->MaDanhMuc,
                'MaPhong' => $request->MaPhong,
                'SoLuong' => $request->SoLuong,
                'NgayNhap' => $request->NgayNhap,
                'TinhTrang' => $request->TinhTrang,
                'GhiChu' => $request->GhiChu,
                'updated_by' => Auth::id()
            ]);

            //tao bao tri tai san
            if ($request->TinhTrang == 'Đang bảo trì' && $oldTinhTrang != 'Đang bảo trì') {
                $exists = BaoTri::where('MaTaiSan', $taisan->MaTaiSan)
                    ->where('TinhTrang', 'Đang Xử Lý')
                    ->exists();
                if (!$exists) {
                    BaoTri::create([
                        'MaTaiSan' => $taisan->MaTaiSan,
                        'NgayBaoTri' => now(),
                        'NoiDung' => $request->GhiChu,
                        'TinhTrang' => 'Đang bảo trì',
                        'created_by' => Auth::id(),
                        'assigned_to' => $request->assigned_to

                    ]);
                }
            }
            $taisan->load('phong', 'danhmuc');
            return response()->json([
                'success' => true,
                'message' => 'Thông tin tài sản đã được cập nhật!',
                'data' => $taisan
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cập nhật thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    //xoa tai san
    public function AssetManagement_Delete($id)
    {
        $taisan = TaiSan::find($id);
        if (!$taisan) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy tài sản!'
            ], 404);
        }
        try {
            $taisan->deleted_by = Auth::id();
            $taisan->save();
            $taisan->delete();
            return response()->json([
                'success' => true,
                'message' => 'Xóa tài sản thành công!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Xóa tài sản thất bại!',
                'error' => $e->getMessage()
            ]);
        }
    }
}
