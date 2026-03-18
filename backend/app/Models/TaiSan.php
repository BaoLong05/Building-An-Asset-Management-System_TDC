<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TaiSan extends Model
{
     use SoftDeletes;

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

    protected $appends = ['TenPhong','TenDanhMuc'];
    public function baotri()
    {
        return $this->hasMany(BaoTri::class, 'MaTaiSan');
    }

    public function phong()
    {
        return $this->belongsTo(Phong::class, 'MaPhong');
    }
    public function getTenPhongAttribute(){
        return $this->phong->TenPhong ?? null;
    }

    public function danhmuc(){
        return $this->belongsTo(DanhMuc::class, 'MaDanhMuc');
    }

    public function getTenDanhMucAttribute(){
        return $this->danhmuc->TenDanhMuc ?? null;
    }
}
