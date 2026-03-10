<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DanhMuc;

class DanhMucController extends Controller
{
    public function danhmuc_index(){
        $danhmuc = DanhMuc::all();
        return response()->json($danhmuc);
    }
       
}
