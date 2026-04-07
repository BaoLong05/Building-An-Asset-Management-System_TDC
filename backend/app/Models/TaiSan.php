<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class TaiSan extends Model
{
    use SoftDeletes;

    protected $table = 'taisan';
    protected $primaryKey = 'MaTaiSan';

    protected $fillable = [
        'TenTaiSan',
        'HinhAnh',
        'MaDanhMuc',
        'MaPhong',
        'SoLuong',
        'NgayNhap',
        'TinhTrang',
        'GhiChu',
        'created_by',
        'updated_by',
        'deleted_by'
    ];

    protected $appends = ['TenPhong', 'TenDanhMuc'];
    public function baotri()
    {
        return $this->hasMany(BaoTri::class, 'MaTaiSan');
    }

    public function phong()
    {
        return $this->belongsTo(Phong::class, 'MaPhong');
    }
    public function getTenPhongAttribute()
    {
        return $this->phong->TenPhong ?? null;
    }

    public function danhmuc()
    {
        return $this->belongsTo(DanhMuc::class, 'MaDanhMuc');
    }

    public function getTenDanhMucAttribute()
    {
        return $this->danhmuc->TenDanhMuc ?? null;
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function deletedBy()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
}
