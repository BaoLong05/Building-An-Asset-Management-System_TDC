<?php

namespace App\Http\Controllers\Export;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ExcelServices;
use App\Exports\ExcelExport;
use  App\Exports\TaisanExport;
use App\Exports\BaotriExport;
use App\Exports\DanhmucExport;
use App\Exports\PhongExport;
use Nette\Utils\Json;

class ExcelController extends Controller
{
    protected $excelServices;

    public function __construct(ExcelServices $excelServices)
    {
        $this->excelServices = $excelServices;
    }

    //xuat excel tai san
    public function exportTaisan(Request $request)
    {
        try {
            $filters = $request->only([
                'MaDanhMuc',
                'MaPhong',
                'TinhTrang'
            ]);

            return $this->excelServices->exportExcel(
                TaisanExport::class,
                $filters,
                'taisan.xlsx'
            );
        } catch (\Exception $e) {
            return response()
                ->json([
                    'success' => false,
                    'message' => 'xuất excel không thành công!',
                    'error' => $e->getMessage()
                ], 500);
        }
    }

    //xuat excel bao tri
    public function exportBaotri(Request $request)
    {
        try {
            $filters = $request->only([
                'TinhTrang'
            ]);

            return $this->excelServices->exportExcel(
                BaotriExport::class,
                $filters,
                'baotri.xlsx'
            );
        } catch (\Exception $e) {
            return response()
                ->json([
                    'success' => false,
                    'message' => 'xuất excel không thành công!',
                    'error' => $e->getMessage()
                ], 500);
        }
    }

    //xuat excel danh muc
    public function exportDanhmuc(Request $request)
    {
        try {
            return $this->excelServices->exportExcel(
                DanhmucExport::class,
                $request->all(),
                "danhmuc.xlsx"
            );
        } catch (\Exception $e) {
            return response()
                ->json([
                    'success' => false,
                    'message' => 'xuất excel không thành công!',
                    'error' => $e->getMessage()
                ], 500);
        }
    }

    //xuat phong
    public function exportPhong(Request $request)
    {
        try {
            return $this->excelServices->exportExcel(
                PhongExport::class,
                $request->all(),
                "phong.xlsx"
            );
        } catch (\Exception $e) {
            return response()
                ->json([
                    'success' => false,
                    'message' => 'xuất excel không thành công!',
                    'error' => $e->getMessage()
                ], 500);
        }
    }
}
