<?php

namespace App\Http\Controllers\Export;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TaiSan;
use App\Models\DanhMuc;
use App\Models\Phong;
use App\Models\BaoTri;

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

    //xuat pdf danh muc
    public function Export_DanhMuc(Request $request)
    {
        $query = DanhMuc::query();

        $danhmuc = $query->get();
        return $this->pdfService->generate(
            'pdf.danhmuc',
            ['danhmuc' => $danhmuc],
            'danhsach_danhmuc.pdf'
        );
    }

    //xuat pdf phong
    public function Export_Phong(Request $request)
    {
        $query = Phong::query();
        $phong = $query->get();
        return $this->pdfService->generate(
            'pdf.phong',
            ['phong' => $phong],
            'danhsach_phong.pdf'

        );
    }

    //xuat pdf bao tri
    public function Export_Baotri(Request $request)
    {
        $query = BaoTri::query();
        if ($request->TinhTrang) {
            $query->where('TinhTrang', $request->TinhTrang);
        }

        $baotri = $query->get();
        return $this->pdfService->generate(
            'pdf.baotri',
            ['baotri' => $baotri],
            'danhsach_baotri.pdf'
        );
    }
}
