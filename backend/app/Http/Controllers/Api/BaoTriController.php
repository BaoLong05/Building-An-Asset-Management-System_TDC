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
                    ->orWhere('MaTaiSan', 'LIKE', "%$search%")
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
}
