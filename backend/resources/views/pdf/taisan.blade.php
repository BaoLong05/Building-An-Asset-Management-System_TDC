<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Danh Sách Tài Sản</title>

        <style>
        body {
            font-size: 13px;
            padding: 10px;
        }

        h2 {
            text-align: center;
            margin-bottom: 15px;
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
        }

        th {
            background: #f2f2f2;
            font-weight: bold;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 8px;
        }

        th:nth-child(1),
        td:nth-child(1) {
            width: 10%;
            text-align: center;
        }

        th:nth-child(2),
        td:nth-child(2) {
            width: 25%;
            text-align: left;
        }

        th:nth-child(3),
        td:nth-child(3) {
            width: 65%;
            text-align: left;
        }

        tbody tr:nth-child(even) {
            background-color: #fafafa;
        }

        tbody tr:hover {
            background-color: #f1f1f1;
        }
    </style>
</head>

<body>

    <h2>DANH SÁCH TÀI SẢN</h2>

    <div class="filter">
        <strong>Bộ lọc:</strong>
        <ul>

            @if(request('TinhTrang'))
                <li>Trạng thái: {{ request('TinhTrang') }}</li>
            @endif

            @if(request('MaDanhMuc'))
                <li>Mã danh mục: {{ request('MaDanhMuc') }}</li>
            @endif

            @if(request('MaPhong'))
                <li>Mã phòng: {{ request('MaPhong') }}</li>
            @endif

            @if(!request()->hasAny(['keyword','TinhTrang','MaDanhMuc','MaPhong']))
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
                <th>Đơn giá</th>
                <th>Ngày nhập</th>
                <th>Trạng thái</th>
                <th>Thành tiền</th>
            </tr>
        </thead>

        <tbody>
            @php
                $tongTien = 0;
            @endphp

            @foreach ($taisan as $item)
                @php
                    $thanhTien = $item->SoLuong * $item->DonGia;
                    $tongTien += $thanhTien;
                @endphp

                <tr>
                    <td>{{ $item->MaTaiSan }}</td>
                    <td class="text-left">{{ $item->TenTaiSan }}</td>
                    <td>{{ $item->danhmuc->TenDanhMuc ?? '' }}</td>
                    <td>{{ $item->phong->TenPhong ?? '' }}</td>
                    <td>{{ $item->SoLuong }}</td>
                    <td>{{ number_format($item->DonGia, 0, ',', '.') }} VNĐ</td>
                    <td>{{ \Carbon\Carbon::parse($item->NgayNhap)->format('d/m/Y') }}</td>
                    <td>{{ $item->TinhTrang }}</td>
                    <td>{{ number_format($thanhTien, 0, ',', '.') }} VNĐ</td>
                </tr>
            @endforeach

            <tr class="total">
                <td colspan="8">Tổng cộng</td>
                <td>{{ number_format($tongTien, 0, ',', '.') }} VNĐ</td>
            </tr>
        </tbody>
    </table>

</body>

</html>