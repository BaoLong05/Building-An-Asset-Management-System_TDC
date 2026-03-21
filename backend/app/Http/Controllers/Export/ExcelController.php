<?php

namespace App\Http\Controllers\Export;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ExcelServices;
use App\Exports\ExcelExport;
use  App\Exports\TaisanExport;

class ExcelController extends Controller
{
    protected $excelServices;

    public function __construct(ExcelServices $excelServices)
    {
        $this->excelServices = $excelServices;
    }

    public function exportTaisan(Request $request)
{
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
}
}