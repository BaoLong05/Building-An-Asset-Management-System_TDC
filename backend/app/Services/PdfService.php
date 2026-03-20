<?php

namespace App\Services;
use Barryvdh\DomPDF\Facade\Pdf;
class PdfService
{
    public function generate($view , $data = [], $filename='file.pdf'){
        $pdf = Pdf::loadView($view, $data);
        return $pdf->download($filename);
    }

    public function stream($view, $data){
        return Pdf::loadView($view, $data)->stream();
    }
}
