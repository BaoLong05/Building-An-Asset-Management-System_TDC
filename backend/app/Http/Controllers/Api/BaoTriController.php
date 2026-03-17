<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BaoTri;

class BaoTriController extends Controller
{
    public function baotri_index(Request $request)
    {
        $query = BaoTri::query();

        $query->whereNull('deleted_at');

        //tim klem
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('MaTaiSan', 'LIKE', "%$search%")
                    ->orWhere('TenTaiSan', 'LIKE', "%$search%")
                    ->orWhere('NoiDung', 'LIKE', "%$search%")
                    ->orWhere('ChiPhi', 'LIKE', "%$search%")
                    ->orWhere('TrangThai', 'LIKE', "%$search%");
            });
        }
        $baotri = $query->orderBy('MaTaiSan', 'desc')->paginate(10);
        return response()->json([
            'success' => true,
            'data' => $baotri
        ]);
    }

    //nhan request bao tri tu tai san
    public function baotri_store(Request $request){
        $request->validate([
            'MaTaiSan' => 'required',
            'TenTaiSan' => 'required',
            'NoiDung' => 'nullable'
        ]);

        $baotri = BaoTri::create([
            'MaTaiSan' => $request->MaTaiSan,
            'NgayBaoTri' => now(),
            'NoiDung' => $request->NoiDung,
            'TrangThai' => 'Đang Xử Lý'
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Đã gửi bảo trì!',
            'data' => $baotri
        ]);
    }
    
    //cap nhat trang thai bao tri
    public function baotri_updata(Request $request, $id){
        $baotri = BaoTri::find($id);

        //kiem tra bao tri co ton tai khong
        if(!$baotri){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy tài sản cần bảo trì!'
            ]);
        }
        $baotri->update([
            'TrangThai' => $request->TrangThai,
            'NoiDung' => $request->NoiDung
        ]);

        return response()->json([
            'success'=> true,
            'message' => 'Cập nhật trạng thái bảo trì thành công!'
        ]);
    }
    //lich su bao tri
    public function baotri_history($MaTaiSan){
        $history = BaoTri::where('MaTaiSan', $MaTaiSan)
        ->orderBy('NgayBaoTri', 'desc')
        ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $history
        ]);
    }

    //xoa 
    public function baotri_delete($id){
        $baotri = BaoTri::find($id);
        if(!$baotri){
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu'
            ]);
        }
         $baotri->delete();
         return response()->json([
            'success' => true,
            'message' => 'Xóa thành công!'
         ]);
    }
}
