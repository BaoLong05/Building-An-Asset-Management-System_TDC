<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaiSanController;
use App\Http\Controllers\Api\DanhMucController;
use App\Http\Controllers\Api\PhongController;
use App\Http\Controllers\Api\BaoTriController;
use App\Http\Controllers\Export\ExcelController;
use App\Http\Controllers\Export\PdfController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PasswordController;



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
Route::put('/baotri/{id}', [BaoTriController::class, 'baotri_update']);
//4. xoa bao tri
Route::delete('/baotri/{id}', [BaoTriController::class, 'baotri_delete']);
//5. bao tri history
Route::get('/baotri/lichsu/{id}', [BaoTriController::class, 'baotri_history']);



//export excel
//1. tai san
Route::get('exportExcel/taisan', [ExcelController::class, 'exportTaisan']);
//2.Bao tri
Route::get('exportExcel/baotri', [ExcelController::class, 'exportBaotri']);
//3.danh muc
Route::get('exportExcel/danhmuc', [ExcelController::class, 'exportDanhmuc']);
//4. phong
Route::get('exportExcel/phong', [ExcelController::class, 'exportPhong']);

//xuat pdf
//1. Tai san
Route::get('/export/taisan', [PdfController::class, 'Export_Taisan']);
//2. Danh muc
Route::get('/export/danhmuc', [PdfController::class, 'Export_DanhMuc']);
//3. phong
Route::get('/export/phong', [PdfController::class, 'Export_Phong']);
//4. Bao tri
Route::get('/export/baotri', [PdfController::class, 'Export_Baotri']);


//Login , Logout

//1.login
Route::post('/login', [AuthController::class, 'login']);

//2. reset password

Route::post('/forgot-password', [PasswordController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordController::class, 'resetPassword']);

Route::middleware(['auth:sanctum', 'activity', 'token.expiry'])->group(function(){
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    //admin
    Route::middleware('role:admin')->group(function(){
        Route::get('/user', fn()=> 'Admin only');
    });
});