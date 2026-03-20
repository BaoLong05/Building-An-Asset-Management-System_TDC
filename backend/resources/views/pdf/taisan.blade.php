<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Danh Sách Tài Sản</title>

    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 12px;
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
        }

        th {
            background: #f2f2f2;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
        }

        .text-left {
            text-align: left;
        }

        .total {
            font-weight: bold;
            background: #f9f9f9;
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
                    <td>{{ number_format($item->DonGia, 0, ',', '.') }} đ</td>
                    <td>{{ \Carbon\Carbon::parse($item->NgayNhap)->format('d/m/Y') }}</td>
                    <td>{{ $item->TinhTrang }}</td>
                    <td>{{ number_format($thanhTien, 0, ',', '.') }} đ</td>
                </tr>
            @endforeach

            <tr class="total">
                <td colspan="8">Tổng cộng</td>
                <td>{{ number_format($tongTien, 0, ',', '.') }} đ</td>
            </tr>
        </tbody>
    </table>

</body>

</html>