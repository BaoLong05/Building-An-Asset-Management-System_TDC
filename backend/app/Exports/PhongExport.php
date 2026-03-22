<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use App\Models\Phong;

class PhongExport implements
    FromCollection,
    WithHeadings,
    WithMapping,
    WithStyles,
    ShouldAutoSize
{
    public function collection()
    {
        $phong = Phong::get();
        if (!$phong) {
            return [
                'MaPhong' => '',
                'TenPhong' => 'không có phòng',
                'ViTri' => ''
            ];
        }
        return $phong;
    }

    public function map($row): array
    {
        return [
            $row->MaPhong,
            $row->TenPhong,
            $row->ViTri
        ];
    }
    //tieu de
    public function headings(): array
    {
        return [
            'Mã Phòng',
            'Tên Phòng',
            'Vị Trí Phòng'
        ];
    }

    //style
    public function styles(Worksheet $sheet)
    {
        $hightRow = $sheet->getHighestRow();
        $higthCollum = $sheet->getHighestColumn();
        //in dam - nen - vien
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
        $sheet->getStyle("A1:{$higthCollum}{$hightRow}")
        ->getBorders()
        ->getAllBorders()
        ->setBorderStyle(Border::BORDER_THIN);
        //xan giua
        $sheet->getStyle("A2:A{$hightRow}")->getAlignment()->setHorizontal('center');
        $sheet->getStyle("E2:E{$hightRow}")->getAlignment()->setHorizontal('center');
        $sheet->getStyle("F2:F{$hightRow}")->getAlignment()->setHorizontal('right');

        //mau xen ke
        for ($row = 2; $row <= $hightRow; $row++) {
            if ($row % 2 == 0) {
                $sheet->getStyle("A{$row}:{$higthCollum}{$row}")
                    ->getFill()
                    ->applyFromArray([
                        'fillType' => 'solid',
                        'startColor' => ['rgb' => 'F2F2F2'],
                    ]);
            }
        }

        //chieu cai
        $sheet->getRowDimension(1)->setRowHeight(25);
        return [];
    }
}
