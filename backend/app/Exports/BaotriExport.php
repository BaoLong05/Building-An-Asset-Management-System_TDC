<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use App\Models\BaoTri;

class BaotriExport implements
    FromCollection,
    WithHeadings,
    WithMapping,
    WithStyles,
    ShouldAutoSize
{
    protected $filters;
    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = BaoTri::query();

        if (isset($this->filters['TinhTrang']) && $this->filters['TinhTrang'] != '') {
            $query->where('TinhTrang', $this->filters['TinhTrang']);
        }

        $data = $query->with([
            'taisan:MaTaiSan,TenTaiSan',
            'assignee:id,name',
            'creator:id,name'
        ])->get();

        if ($data->isEmpty()) {
            return collect([
                (object)[
                    'MaBaoTri' => '',
                    'taisan' => 'Không có bảo trì',
                    'NoiDung' => '',
                    'NgayBaoTri' => '',
                    'TinhTrang' => ''
                ]
            ]);
        }
        return $data;
    }

    public function map($row): array
    {
        return [
            $row->MaBaoTri,
            $row->taisan->TenTaiSan ?? $row->taisan,
            $row->NoiDung,
            $row->NgayBaoTri,
            $row->TinhTrang,
            optional($row->creator)->name,
            optional($row->assignee)->name,
        ];
    }

    public function headings(): array
    {
        return [
            'Mã Bảo Trì',
            'Tên Tài Sản',
            'Nội Dung',
            'Ngày Bảo Trì',
            'Trạng Thái Bảo Trì',
            'Người Nhận',
            'Người Gửi'
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $hightRow = $sheet->getHighestRow();
        $hightCollum = $sheet->getHighestColumn();

        //in dam - ne - can giua
        $sheet->getStyle('A1:I1')->applyFromArray([
            'front' => [
                'bold' => true,
                'size' => 12,
                'color' => ['rgb' => 'FFFFFF'],
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


        //format ngay thang
        $sheet->getStyle("G2:G{$hightRow}")
            ->getNumberFormat()
            ->setFormatCode('dd/mm/yyyy');

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
