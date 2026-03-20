<?php

namespace App\Http\Controllers\Export;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TaiSan;
use App\Services\PdfService;

class PdfController extends Controller
{
    protected $pdfService;
    public function __construct(PdfService $pdfService)
    {
        $this->pdfService = $pdfService;
    }
    public function Export_Taisan(Request $request)
    {
        $query = TaiSan::query();

        //xuat theo danh muc
        if ($request->MaDanhMuc) {
            $query->where('MaDanhMuc', $request->MaDanhMuc);
        }
        //xuat theo phong
        if ($request->MaPhong) {
            $query->where('MaPhong', $request->MaPhong);
        }
        //xuat theo trang thai
        if ($request->TinhTrang) {
            $query->where('TinhTrang', $request->TinhTrang);
        }
        $taisan = $query->get();

        return $this->pdfService->generate(
            'pdf.taisan',
            ['taisan' => $taisan],
            'danhsach_taisan.pdf'
        );
    }
}
