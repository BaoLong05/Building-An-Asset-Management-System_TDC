<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaiSanController;
use App\Http\Controllers\Api\DanhMucController;


//quan ly tai san
//1. lay danh sach tai san
Route::get('/taisan', [TaiSanController::class, 'index']);
//2. them tai san
Route::post('/taisan', [TaiSanController::class, 'AssetManagement_store']);
//3. cap nhat tai san
Route::put('/taisan/{id}', [TaiSanController::class, 'AssetManagement_Update']);
//4. xoa tai san
Route::delete('/taisan/{id}', [TaiSanController::class, 'AssetManagement_Delete']);
//5. bao tri tai san
Route::put('/taisan/{id}/maintenance', [TaiSanController::class, 'AssetManagement_Maintenance']);

//quan ly danh muc
//1. lay danh sach danh muc
Route::get('/danhmuc', [DanhMucController::class, 'danhmuc_index']);