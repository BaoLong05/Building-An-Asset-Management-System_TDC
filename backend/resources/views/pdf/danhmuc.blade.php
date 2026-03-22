<html lang="vi">
<head>
    <meta charset="UTF-8">
    <style>
        body{
            font-size: 13px;
            padding: 10px;
        }

        h2{
            text-align: center;
            margin-bottom: 15px; 
        }

        table{
            width: 100%;
            border-collapse: collapse;
        }

        th{
            background: #f2f2f2;
            font-weight: bold;
        }

        th, td{
            border: 1px solid #000;
            padding: 8px;
        }

        th:nth-child(1), td:nth-child(1){
            width: 10%;
            text-align: center;
        }

        th:nth-child(2), td:nth-child(2){
            width: 25%;
            text-align: left;
        }

        th:nth-child(3), td:nth-child(3){
            width: 65%;
            text-align: left;
        }

        tbody tr:nth-child(even){
            background-color: #fafafa;
        }

        tbody tr:hover{
            background-color: #f1f1f1;
        }

    </style>
</head>
<body>
    <h2>DANH SÁCH DANH MỤC</h2>
    <table>
        <thead>
            <tr>
                <th>Mã</th>
                <th>Tên Danh Mục</th>
                <th>Mô Tả</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($danhmuc as $item)
                <tr>
                    <td>{{$item->MaDanhMuc}}</td>
                    <td>{{$item->TenDanhMuc}}</td>
                    <td>{{$item->MoTa}}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>