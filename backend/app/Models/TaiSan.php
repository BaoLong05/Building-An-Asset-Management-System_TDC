<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaiSan extends Model
{
    protected $table = 'taisan';
    protected $primaryKey = 'MaTaiSan';

    protected $fillable = [
         'TenTaiSan',
        'MaDanhMuc',
        'MaPhong',
        'SoLuong',
        'DonGia',
        'NgayNhap',
        'TinhTrang',
        'GhiChu'
    ];

    public function baotri(){
        return $this->belongsTo(TaiSan::class, 'MaTaiSan');
    }
}
