<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaiSanController;
use App\Http\Controllers\Api\DanhMucController;
use App\Http\Controllers\Api\PhongController;
use App\Http\Controllers\Api\BaoTriController;
use App\Http\Controllers\Export\ExcelController;
use App\Models\BaoTri;

//quan ly tai san
//1. lay danh sach tai san
Route::get('/taisan', [TaiSanController::class, 'index']);
//2. them tai san
Route::post('/taisan', [TaiSanController::class, 'AssetManagement_store']);
//3. cap nhat tai san
Route::put('/taisan/{id}', [TaiSanController::class, 'AssetManagement_Update']);
//4. xoa tai san
Route::delete('/taisan/{id}', [TaiSanController::class, 'AssetManagement_Delete']);

//quan ly danh muc
//1. lay danh sach va tim kiem danh muc
Route::get('/danhmuc', [DanhMucController::class, 'danhmuc_index']);
//2. them danh muc
Route::post('/danhmuc', [DanhMucController::class, 'store_danhmuc']);
//3. sua danh muc
Route::put('/danhmuc/{id}', [DanhMucController::class, 'update_danhmuc']);
//4. xoa danh muc
Route::delete('/danhmuc/{id}', [DanhMucController::class, 'delete_danhmuc']);

//quan ly phong hoc
//1.lay danh sach phong hoc va tim kiem
Route::get('/phong', [PhongController::class, 'phong_index']);
//2.them  phong hoc 
Route::post('/phong', [PhongController::class, 'phong_store']);
//3.sua  phong hoc
Route::put('/phong/{id}', [PhongController::class, 'phong_update']); 
//4.sua  phong hoc 
Route::delete('/phong/{id}', [PhongController::class, 'phong_delete']);
//5. tai san chi tiet trong 1 phong
Route::get('/phong/{id}/taisan', [PhongController::class, 'phong_asset']);


//quan ly bao tri
//1.lay danh sach bao tri va tim kiem
Route::get('/baotri', [BaoTriController::class, 'baotri_index']);
//2. them bao tri
Route::post('/baotri', [BaoTriController::class, 'baotri_store']);
//3. cap nhat bao tri
Route::put('/baotri/{id}',[BaoTriController::class, 'baotri_update']);
//4. xoa bao tri
Route::delete('/baotri/{id}', [BaoTriController::class, 'baotri_delete']);
//5. bao tri history
Route::get('/baotri/lichsu/{id}', [BaoTriController::class, 'baotri_history']);


//export excel
Route::get('export/taisan', [ExcelController::class, 'exportTaisan']);