<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use App\Models\TaiSan;

class TaisanExport implements FromCollection, WithHeadings, WithMapping, WithStyles, ShouldAutoSize
{
    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = TaiSan::query();

        if (isset($this->filters['MaDanhMuc']) && $this->filters['MaDanhMuc'] !== '') {
            $query->where('MaDanhMuc', $this->filters['MaDanhMuc']);
        }

        if (isset($this->filters['MaPhong']) && $this->filters['MaPhong'] !== '') {
            $query->where('MaPhong', $this->filters['MaPhong']);
        }

        if (isset($this->filters['TinhTrang']) && $this->filters['TinhTrang'] !== '') {
            $query->where('TinhTrang', $this->filters['TinhTrang']);
        }

        $data = $query->with([
            'danhmuc:MaDanhMuc,TenDanhMuc',
            'phong:MaPhong,TenPhong'
        ])->get();

        //khong co du lieu
        if ($data->isEmpty()) {
            return collect([
                (object)[
                    'MaTaiSan' => '',
                    'TenTaiSan' => 'Không có tài sản',
                    'danhmuc' => null,
                    'phong' => null,
                    'SoLuong' => '',
                    'NgayNhap' => '',
                    'TinhTrang' => '',
                    'GhiChu' => '',
                ]
            ]);
        }
        return $data;
    }

    public function map($row): array
    {
        return [
            $row->MaTaiSan,
            $row->TenTaiSan,
            optional($row->danhmuc)->TenDanhMuc,
            optional($row->phong)->TenPhong,
            $row->SoLuong,
            $row->NgayNhap,
            $row->TinhTrang,
            $row->GhiChu,
        ];
    }

    public function headings(): array
    {
        return [
            'Mã Tài Sản',
            'Tên Tài sản',
            'Tên Danh Mục',
            'Tên Phòng',
            'Số Lượng',
            'Ngày Nhập',
            'Tình Trạng',
            'Ghi Chú'
        ];
    }
    public function styles(Worksheet $sheet)
    {
        $highestRow = $sheet->getHighestRow();
        $highestColumn = $sheet->getHighestColumn();

        // in dam - nen -can giua
        $sheet->getStyle('A1:H1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 12,
                'color' => ['rgb' => 'FFFFFF'],
            ],
            'fill' => [
                'fillType' => 'solid',
                'startColor' => ['rgb' => '4472C4'],
            ],
            'alignment' => [
                'horizontal' => 'center',
                'vertical' => 'center',
            ],
        ]);

        //border
        $sheet->getStyle("A1:{$highestColumn}{$highestRow}")
            ->getBorders()
            ->getAllBorders()
            ->setBorderStyle(Border::BORDER_THIN);

        //can giua
        $sheet->getStyle("A2:A{$highestRow}")->getAlignment()->setHorizontal('center');
        $sheet->getStyle("E2:E{$highestRow}")->getAlignment()->setHorizontal('center');
        $sheet->getStyle("F2:F{$highestRow}")->getAlignment()->setHorizontal('right');

        // format ngay
        $sheet->getStyle("G2:G{$highestRow}")
            ->getNumberFormat()
            ->setFormatCode('dd/mm/yyyy');

        //mau xen ke
        for ($row = 2; $row <= $highestRow; $row++) {
            if ($row % 2 == 0) {
                $sheet->getStyle("A{$row}:{$highestColumn}{$row}")
                    ->getFill()
                    ->applyFromArray([
                        'fillType' => 'solid',
                        'startColor' => ['rgb' => 'F2F2F2'],
                    ]);
            }
        }

        // chieu cao header
        $sheet->getRowDimension(1)->setRowHeight(25);

        return [];
    }
}
