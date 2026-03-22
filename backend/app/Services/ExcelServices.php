<?php

namespace App\Services;

use Maatwebsite\Excel\Facades\Excel;
class ExcelServices
{
   public function exportExcel($exportClass, $filters = [], $filename = 'file.xlsx'){
    return Excel::download(new $exportClass($filters), $filename);
   }
}
