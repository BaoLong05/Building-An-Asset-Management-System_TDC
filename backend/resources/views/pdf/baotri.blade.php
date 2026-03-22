<html lang="vi">

<head>
    <meta charset="UTF-8">
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
    <h2>DANH SÁCH TÀI SẢN BẢO TRÌ</h2>
    <div class="fiter">
        <strong>Bộ lọc:</strong>
        <ul>
            @if (request('TinhTrang'))
                <li>Trạng Thái: {{ request('TinhTrang') }}</li>
            @endif

            @if (!request()->hasAny(['TinhTrang']))
                <li>Tất cả dữ liệu</li>
            @endif
        </ul>
    </div>
    <table>
        <thead>
            <tr>
                <th>Mã Bảo Trì</th>
                <th>Tên Tài Sản</th>
                <th>Nội Dung</th>
                <th>Ngày Bảo Trì</th>
                <th>Trạng Thái</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($baotri as $item)
                <tr>
                    <td>{{ $item->MaBaoTri }}</td>
                    <td>{{ $item->taisan->TenTaiSan ?? '' }}</td>
                    <td>{{ $item->NoiDung }}</td>
                    <td>{{ $item->NgayBaoTri }}</td>
                    <td>{{ $item->TinhTrang }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
