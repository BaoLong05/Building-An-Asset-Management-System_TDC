<?php

namespace App\Exports;

use App\Exports\BaotriExport;
use App\Exports\DanhmucExport;
use App\Exports\PhongExport;
use App\Exports\TaisanExport;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ExcelExport implements WithMultipleSheets
{
    protected $filters;
    public function __construct($filters)
    {
        $this->filters = $filters;
    }
    public function sheets(): array
    {
        return [
            new TaisanExport($this->filters),
            new DanhmucExport(),
            new PhongExport(),
            new BaotriExport($this->filters),
        ];
    }
}
