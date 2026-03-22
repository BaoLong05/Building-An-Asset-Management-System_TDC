<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use App\Models\DanhMuc;

class DanhmucExport implements
    FromCollection,
    WithHeadings,
    WithMapping,
    WithStyles,
    ShouldAutoSize
{

    public function collection()
    {
        $danhmuc = DanhMuc::get();
        if (!$danhmuc) {
            return [
                'MaDanhMuc' => '',
                'TenDanhMuc' => 'Không có danh mục',
                'MoTa' => ''
            ];
        }
        return $danhmuc;
    }
    public function map($row): array
    {
        return [
            $row->MaDanhMuc,
            $row->TenDanhMuc,
            $row->MoTa
        ];
    }
    //tieu de
    public function headings(): array
    {
        return [
            'Mã Danh Mục',
            'Tên Danh Mục',
            'Mô Tả'
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $hightRow = $sheet->getHighestRow();
        $hightCollum = $sheet->getHighestColumn();

        //in dam - nen - can giua
        $sheet->getStyle('A1:C1')->applyFromArray([
            'front' => [
                'bold' => true,
                'size' => 12,
                'color' => ['rgb' => 'FFFFFF']
            ],
            'fill' => [
                'fillType' => 'solid',
                'startColor' => ['rgb' => '4472C4']
            ],
            'alignment' => [
                'horizonal' => 'center',
                'vertical' => 'center'
            ]
        ]);

        //border
        $sheet->getStyle("A1:{$hightCollum}{$hightRow}")
            ->getBorders()
            ->getAllBorders()
            ->setBorderStyle(Border::BORDER_THIN);
        //can giua
        $sheet->getStyle("A2:A{$hightRow}")->getAlignment()->setHorizontal('center');
        $sheet->getStyle("E2:E{$hightRow}")->getAlignment()->setHorizontal('center');
        $sheet->getStyle("F2:F{$hightRow}")->getAlignment()->setHorizontal('right');

        //mau xen ke
        for ($row = 2; $row <= $hightRow; $row++) {
            if ($row % 2 == 0) {
                $sheet->getStyle("A{$row}:{$hightCollum}{$row}")
                    ->getFill()
                    ->applyFromArray([
                        'fillType' => 'solid',
                        'startColor' => ['rgb' => 'F2F2F2'],
                    ]);
            }
        }

        //chieu cao header
        $sheet->getRowDimension(1)->setRowHeight(25);
        return [];
    }
}
