<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Danh Sách Tài Sản</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
        }

        h2 {
            text-align: center;
            margin-bottom: 10px;
        }

        .filter {
            margin-bottom: 10px;
        }

        .filter ul {
            margin: 0;
            padding-left: 15px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed; /* QUAN TRỌNG */
        }

        th, td {
            border: 1px solid #000;
            padding: 5px;
            font-size: 10px;
            text-align: center;
            word-break: break-word; /* chống tràn chữ */
        }

        th {
            background: #f2f2f2;
        }

        /* FIX WIDTH CỘT */
        th:nth-child(1), td:nth-child(1) { width: 5%; }
        th:nth-child(2), td:nth-child(2) { width: 15%; text-align: left; }
        th:nth-child(3), td:nth-child(3) { width: 10%; }
        th:nth-child(4), td:nth-child(4) { width: 10%; }
        th:nth-child(5), td:nth-child(5) { width: 6%; }
        th:nth-child(6), td:nth-child(6) { width: 10%; }
        th:nth-child(7), td:nth-child(7) { width: 10%; }
        th:nth-child(8), td:nth-child(8) { width: 12%; }
        th:nth-child(9), td:nth-child(9) { width: 7%; }
        th:nth-child(10), td:nth-child(10) { width: 7%; }
        th:nth-child(11), td:nth-child(11) { width: 8%; }

        /* chống vỡ trang */
        tr {
            page-break-inside: avoid;
        }

    </style>
</head>

<body>

    <h2>DANH SÁCH TÀI SẢN</h2>

    <div class="filter">
        <strong>Bộ lọc:</strong>
        <ul>
            @if (request('TinhTrang'))
                <li>Trạng thái: {{ request('TinhTrang') }}</li>
            @endif

            @if (request('MaDanhMuc'))
                <li>Mã danh mục: {{ request('MaDanhMuc') }}</li>
            @endif

            @if (request('MaPhong'))
                <li>Mã phòng: {{ request('MaPhong') }}</li>
            @endif

            @if (!request()->hasAny(['keyword', 'TinhTrang', 'MaDanhMuc', 'MaPhong']))
                <li>Tất cả dữ liệu</li>
            @endif
        </ul>
    </div>

    <table>
        <thead>
            <tr>
                <th>Mã</th>
                <th>Tên tài sản</th>
                <th>Danh mục</th>
                <th>Phòng</th>
                <th>Số lượng</th>
                <th>Ngày nhập</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
                <th>Người tạo</th>
                <th>Người sửa</th>
                <th>Người xóa</th>
            </tr>
        </thead>

        <tbody>
    @if ($taisan->isEmpty())
        <tr>
            <td colspan="11" style="text-align: center; padding: 10px;">
                Không có dữ liệu
            </td>
        </tr>
    @else
        @foreach ($taisan as $item)
            <tr>
                <td>{{ $item->MaTaiSan }}</td>
                <td style="text-align:left">{{ $item->TenTaiSan }}</td>
                <td>{{ $item->danhmuc->TenDanhMuc ?? '' }}</td>
                <td>{{ $item->phong->TenPhong ?? '' }}</td>
                <td>{{ $item->SoLuong }}</td>
                <td>
                    {{ $item->NgayNhap 
                        ? \Carbon\Carbon::parse($item->NgayNhap)->format('d/m/Y') 
                        : '' 
                    }}
                </td>
                <td>{{ $item->TinhTrang }}</td>
                <td>{{ $item->GhiChu }}</td>
                <td>{{ $item->created_by }}</td>
                <td>{{ $item->updated_by }}</td>
                <td>{{ $item->deleted_by }}</td>
            </tr>
        @endforeach
    @endif
</tbody>
    </table>

</body>
</html>